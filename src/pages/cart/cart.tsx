import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
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

type NavigationProps = StackNavigationProp<RootStackParamList>;

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
          const idCarrinho = await AsyncStorage.getItem('idCarrinho');
          if (!token || !idCarrinho) return;

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

          const livrosMap: Record<string, LivroCarrinho> = {};

          for (const item of itensCarrinho) {
            const { data: livro } = await api.get(`/livros/${item.id_livro}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const bookImage = { uri: api.defaults.baseURL + livro.foto };
            const uniqueKey = `${livro.id}_${item.formato}_${item.tipo}`;

            const precoComDesconto =
              assinaturaData[0]?.tipo_assinatura === 'Premium'
                ? item.preco_unitario * 0.8
                : item.preco_unitario;

            if (livrosMap[uniqueKey]) {
              livrosMap[uniqueKey].quantidade += item.quantidade;
            } else {
              livrosMap[uniqueKey] = {
                id: item.id,
                idLivro: livro.id,
                titulo: livro.titulo,
                autor: livro.autor.nome,
                tipo: item.tipo,
                preco: precoComDesconto,
                foto: bookImage,
                formato: item.formato,
                quantidade: item.quantidade,
                estoque: livro.estoque,
                checked: false,
              };
            }
          }

          setLivros(Object.values(livrosMap));
        } catch (error) {
          console.error('Erro ao carregar itens do carrinho:', error);
        } finally {
          setLoading(false);
        }
      };

      buscarItensCarrinho();
    }, [])
  );

  const toggleCheck = (id: string) => {
    setLivros((prevLivros) =>
      prevLivros.map((livro) =>
        livro.id === id ? { ...livro, checked: !livro.checked } : livro
      )
    );
  };

  const aumentarQuantidade = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const livroAtual = livros.find((livro) => livro.id === id);
      if (!livroAtual) return;

      if (livroAtual.quantidade >= livroAtual.estoque) return;

      const novaQuantidade = livroAtual.quantidade + 1;

      await api.put(
        `/item-carrinho/${id}`,
        { quantidade: novaQuantidade },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLivros((prevLivros) =>
        prevLivros.map((livro) =>
          livro.id === id ? { ...livro, quantidade: novaQuantidade } : livro
        )
      );
    } catch (error) {
      console.error('Erro ao aumentar quantidade:', error);
    }
  };

  const diminuirQuantidade = async (id: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return;

      const livroAtual = livros.find((livro) => livro.id === id);
      if (!livroAtual) return;

      if (livroAtual.quantidade <= 1) return;

      const novaQuantidade = livroAtual.quantidade - 1;

      await api.put(
        `/item-carrinho/${id}`,
        { quantidade: novaQuantidade },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLivros((prevLivros) =>
        prevLivros.map((livro) =>
          livro.id === id ? { ...livro, quantidade: novaQuantidade } : livro
        )
      );
    } catch (error) {
      console.error('Erro ao diminuir quantidade:', error);
    }
  };

  const deletarItemDoCarrinho = async (idItem: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.delete(`/item-carrinho/${idItem}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLivros((prevLivros) => prevLivros.filter((livro) => livro.id !== idItem));
    } catch (error) {
      console.error('Erro ao deletar item do carrinho:', error);
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Image source={item.foto} style={styles.image} />
        <View style={styles.qtdContainer}>
          <TouchableOpacity
            style={styles.qtdButton}
            onPress={() => diminuirQuantidade(item.id)}
          >
            <Text style={styles.qtdText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtdText}>{item.quantidade}</Text>
          <TouchableOpacity
            style={styles.qtdButton}
            onPress={() => aumentarQuantidade(item.id)}
          >
            <Text style={styles.qtdText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.topInfo}>
          <Text style={styles.title}>{item.titulo}</Text>
          <TouchableOpacity onPress={() => deletarItemDoCarrinho(item.id)}>
            <TrashIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.author}>por {item.autor}</Text>
        <Text style={styles.type}>{item.tipo}</Text>
        {item.estoque > 0 && <Text style={styles.inStock}>Em estoque</Text>}
        <Text style={styles.price}>R$ {item.preco.toFixed(2)}</Text>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => toggleCheck(item.id)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.checkbox,
              item.checked && styles.checkboxChecked,
            ]}
          >
            {item.checked && <View style={styles.checkboxTick} />}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const subtotal = livros.reduce((total, item) => {
    return item.checked ? total + item.preco * item.quantidade : total;
  }, 0);

  const totalItensSelecionados = livros.reduce(
    (sum, item) => (item.checked ? sum + item.quantidade : sum),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CARRINHO DE COMPRAS</Text>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.separator} />
      </View>

      <View style={{ flex: 1, position: 'relative' }}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#8000FF" />
          </View>
        ) : (
          <FlatList
            data={livros}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <View style={styles.totalBox}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>R$ {subtotal.toFixed(2)}</Text>
        </View>
        <Text style={styles.semFrete}>Sem o frete incluído</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            const selecionados = livros
              .filter((livro) => livro.checked)
              .map((livro) => livro.id);
            navigation.navigate('PaymentBook', { selectedBookIds: selecionados });
          }}
          disabled={totalItensSelecionados === 0}
        >
          <Text style={styles.checkoutText}>
            Fechar pedido ({totalItensSelecionados} {totalItensSelecionados === 1 ? 'item' : 'itens'})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
