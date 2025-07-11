import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import api from '../../../API/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TrashIcon from './assets/Trash.svg';

interface LivroCarrinho {
  id: string;
  idLivro: string;
  titulo: string;
  autor: string;
  tipo: string;
  preco: number;
  foto: { uri: string };
  quantidade: number;
  estoque: number;
  formato: string;
  checked: boolean;
}

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Cart() {
  const navigation = useNavigation<NavigationProps>();
  const [livros, setLivros] = useState<LivroCarrinho[]>([]);
  const [loading, setLoading] = useState(true);
  const [assinatura, setAssinatura] = useState<'Básica' | 'Premium' | null>(null);

  useFocusEffect(
    useCallback(() => {
      const buscarItensCarrinho = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('userToken');
          let idCarrinho = await AsyncStorage.getItem('idCarrinho');

          if (!idCarrinho) {
            const { data: carrinhoData } = await api.get('/carrinhos', {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (carrinhoData.length > 0) {
              idCarrinho = carrinhoData[0].id;
              if (idCarrinho) {
                await AsyncStorage.setItem('idCarrinho', idCarrinho);
              }
            } else {
              console.warn('Nenhum carrinho encontrado.');
              return;
            }
          }

          if (!token) return;

          const { data: itensCarrinho } = await api.get(
            `/item-carrinho/carrinho/${idCarrinho}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const { data: assinaturaData } = await api.get('/assinaturas/', {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (assinaturaData.length > 0) {
            setAssinatura(assinaturaData[0].tipo_assinatura);
          }

          const livrosProcessados: LivroCarrinho[] = [];

          for (const item of itensCarrinho) {
            const { data: livro } = await api.get(`/livros/${item.id_livro}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const precoFinal = assinaturaData[0]?.tipo_assinatura === 'Premium'
              ? item.preco_unitario * 0.8
              : item.preco_unitario;

            livrosProcessados.push({
              id: item.id,
              idLivro: livro.id,
              titulo: livro.titulo,
              autor: livro.autor.nome,
              tipo: item.tipo,
              preco: precoFinal,
              foto: { uri: api.defaults.baseURL + livro.foto },
              formato: item.formato,
              quantidade: item.quantidade,
              estoque: livro.estoque,
              checked: false,
            });
          }

          setLivros(livrosProcessados);
        } catch (err) {
          console.error('Erro ao carregar itens:', err);
        } finally {
          setLoading(false);
        }
      };

      buscarItensCarrinho();
    }, [])
  );

  const toggleCheckIndividual = (id: string) => {
    setLivros((prev) =>
      prev.map((livro) =>
        livro.id === id ? { ...livro, checked: !livro.checked } : livro
      )
    );
  };
  
  const groupByIdLivro = (items: LivroCarrinho[]) => {
    const grouped: Record<string, LivroCarrinho[]> = {};
    for (const item of items) {
      if (!grouped[item.idLivro]) grouped[item.idLivro] = [];
      grouped[item.idLivro].push(item);
    }
    return Object.values(grouped);
  };

  const aumentarQuantidade = async (id: string) => {
    const token = await AsyncStorage.getItem('userToken');
    const livro = livros.find((l) => l.id === id);
    if (!livro || livro.quantidade >= livro.estoque || !token) return;

    const novaQuantidade = livro.quantidade + 1;
    await api.put(`/item-carrinho/${id}`, { quantidade: novaQuantidade }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLivros((prev) => prev.map((l) => l.id === id ? { ...l, quantidade: novaQuantidade } : l));
  };

  const diminuirQuantidade = async (id: string) => {
    const token = await AsyncStorage.getItem('userToken');
    const livro = livros.find((l) => l.id === id);
    if (!livro || livro.quantidade <= 1 || !token) return;

    const novaQuantidade = livro.quantidade - 1;
    await api.put(`/item-carrinho/${id}`, { quantidade: novaQuantidade }, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setLivros((prev) => prev.map((l) => l.id === id ? { ...l, quantidade: novaQuantidade } : l));
  };

  const deletarItemDoCarrinho = async (id: string) => {
    const token = await AsyncStorage.getItem('userToken');
    await api.delete(`/item-carrinho/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLivros((prev) => prev.filter((l) => l.id !== id));
  };

  const toggleCheckGroup = (idLivro: string, value: boolean) => {
    setLivros((prev) => prev.map((l) => l.idLivro === idLivro ? { ...l, checked: value } : l));
  };

  const subtotal = livros.reduce((acc, l) => l.checked ? acc + l.preco * l.quantidade : acc, 0);

  const groupedData = groupByIdLivro(livros);

  const renderItem = ({ item }: { item: LivroCarrinho[] }) => {
  const totalLivro = item.reduce((sum, i) => sum + i.preco * i.quantidade, 0);
  const todosSelecionados = item.every((i) => i.checked);
  const precoOriginal = item[0].preco / 0.8;
  const existeGrupoComMaisDeUm = groupedData.some((grupo) => grupo.length > 1);

  return (
    <View style={styles.card}>
      {/* Topo do grupo: checkbox geral e trash geral */}

      {item.length > 1 && (
        <View style={[styles.topInfo, { justifyContent: 'space-between', alignItems: 'center' }]}>
          {/* Lado esquerdo: Trash geral + texto "Deletar tudo" */}

          {/* Lado direito: Checkbox geral + texto "Selecionar tudo" */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => toggleCheckGroup(item[0].idLivro, !todosSelecionados)}
          >
            <View style={[styles.checkbox, todosSelecionados && styles.checkboxChecked]}>
              {todosSelecionados && <View style={styles.checkboxTick} />}
            </View>
            <Text style={{ marginLeft: 6, color: '#9D4EDD', fontWeight: 'bold' }}>
              Selecionar tudo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => item.forEach(i => deletarItemDoCarrinho(i.id))}
          >
            <Text style={{ marginLeft: 6, color: '#9D4EDD', fontWeight: 'bold' }}>
              Deletar tudo
            </Text>
            <TrashIcon width={24} height={24} />
          </TouchableOpacity>
          
          <View style={styles.separator} />
        </View>
      )}


      {/* Itens individuais */}
      {item.map((livro, index) => (
        <View key={livro.id} style={{ marginTop: index !== 0 ? 16 : 0, position: 'relative' }}>

          {index !== 0 && (
            <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: -5 }} />
          )}
          {/* Trash individual no topo direito do item */}
          <TouchableOpacity
            style={styles.trashButtonItem}
            onPress={() => deletarItemDoCarrinho(livro.id)}
          >
            <TrashIcon width={20} height={20} />
          </TouchableOpacity>

          {/* Conteúdo do item */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 24 }}>
            <View style={styles.leftColumn}>
              <Image source={livro.foto} style={styles.image} />
              <View style={styles.qtdContainer}>
                <TouchableOpacity style={styles.qtdButton} onPress={() => diminuirQuantidade(livro.id)}>
                  <Text style={styles.qtdText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtdText}>{livro.quantidade}</Text>
                <TouchableOpacity style={styles.qtdButton} onPress={() => aumentarQuantidade(livro.id)}>
                  <Text style={styles.qtdText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.title}>{livro.titulo}</Text>
              <Text style={styles.author}>por {livro.autor}</Text>
              <Text style={styles.type}>
                {livro.formato === 'digital'
                  ? 'Formato: Digital'
                  : `Formato: Físico - ${livro.tipo}`}
              </Text>
              {livro.estoque > 0 && <Text style={styles.inStock}>Em estoque</Text>}
              {assinatura === 'Premium' ? (
                <>
                  <Text style={{ fontSize: 12, color: 'red', textDecorationLine: 'line-through' }}>
                    R$ {precoOriginal.toFixed(2)}
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>
                    R$ {livro.preco.toFixed(2)}
                  </Text>
                </>
              ) : (
                <Text style={styles.price}>R$ {livro.preco.toFixed(2)}</Text>
              )}
            </View>

            {/* Checkbox individual */}
            <TouchableOpacity
              style={styles.checkboxContainerItem}
              onPress={() => toggleCheckIndividual(livro.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, livro.checked && styles.checkboxChecked]}>
                {livro.checked && <View style={styles.checkboxTick} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', marginTop: 12, paddingTop: 6, alignItems: 'flex-end' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
          Total deste livro: R$ {totalLivro.toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARRINHO DE COMPRAS</Text>

      <View style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#8000FF" />
          </View>
        ) : groupedData.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
          </View>
        ) : (
          <FlatList
            data={groupedData}
            keyExtractor={(item) => item[0].idLivro}
            renderItem={renderItem}
            contentContainerStyle={{ ...styles.listContent, paddingBottom: 120 }}
          />
        )}

      </View>
        <View style={styles.totalBox}>
          <View style={styles.totalInfo}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <Text style={styles.semFrete}>
            {assinatura === 'Premium'
              ? 'Frete grátis e 20% de desconto aplicado!'
              : assinatura === 'Básica'
              ? 'Frete grátis para assinantes!'
              : 'Sem o frete incluído'}
          </Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              const selecionados = livros.filter((l) => l.checked).map((l) => l.id);
              navigation.navigate('PaymentBook', { selectedBookIds: selecionados });
            }}
            disabled={subtotal === 0}
          >
            <Text style={styles.checkoutText}>
              Fechar pedido ({livros.filter((l) => l.checked).reduce((sum, i) => sum + i.quantidade, 0)} itens)
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
