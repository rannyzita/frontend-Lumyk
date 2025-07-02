import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import LogoPacote from './assets/Pacote.svg';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../API';

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface Pedido {
  id: string;
  data_compra: string;
  total: number;
  taxa_frete: number;
}

interface Livro {
  id: string;
  titulo: string;
}

interface ItemPedido {
  id: string;
  id_pedido: string;
  id_livro: string;
  preco_unitario: number;
  quantidade: number;
  pedido: Pedido;
  livro?: Livro; 
}

interface PedidosAgrupados {
  mesAno: string;
  itens: ItemPedido[];
}

export default function OrderHistory() {
  const navigation = useNavigation<NavigationProps>();
  const [pedidosAgrupados, setPedidosAgrupados] = useState<PedidosAgrupados[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivro = async (idLivro: string): Promise<Livro | undefined> => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return undefined;

        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await api.get<Livro>(`/livros/${idLivro}`, { headers });
        return data;
      } catch (error) {
        console.error(`Erro ao buscar livro ${idLivro}:`, error);
        return undefined;
      }
    };

    const fetchItensPedido = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };
        const { data: itens } = await api.get<ItemPedido[]>('/item-pedido/all', { headers });

        // Para cada item, buscar o livro e adicionar no objeto
        const itensComLivro = await Promise.all(
          itens.map(async (item) => {
            const livro = await fetchLivro(item.id_livro);
            return { ...item, livro };
          })
        );

        // Função para formatar mês e ano para exibição, ex: "Fevereiro de 2025"
        const formatarMesAno = (dataStr: string) => {
          const date = new Date(dataStr);
          return date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        };

        // Agrupar os itens pelo mês e ano do pedido
        const agrupados: Record<string, ItemPedido[]> = {};
        itensComLivro.forEach((item) => {
          const mesAno = formatarMesAno(item.pedido.data_compra);
          if (!agrupados[mesAno]) agrupados[mesAno] = [];
          agrupados[mesAno].push(item);
        });

        // Transformar em array com chave mesAno e array de itens
        const agrupadosArray = Object.entries(agrupados).map(([mesAno, itens]) => ({
          mesAno,
          itens,
        }));

        // Ordenar decrescente por data (mes/ano)
        agrupadosArray.sort((a, b) => {
          const [mesA, anoA] = a.mesAno.split(' de ');
          const [mesB, anoB] = b.mesAno.split(' de ');
          const dateA = new Date(`${mesA} 1, ${anoA}`);
          const dateB = new Date(`${mesB} 1, ${anoB}`);
          return dateB.getTime() - dateA.getTime();
        });

        setPedidosAgrupados(agrupadosArray);
      } catch (error) {
        console.error('Erro ao carregar itens de pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItensPedido();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8000FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HISTÓRICO DE PEDIDOS</Text>
      <View style={styles.line} />

      {pedidosAgrupados.length === 0 && <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum pedido encontrado.</Text>}

      {pedidosAgrupados.map((grupo, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {grupo.mesAno.charAt(0).toUpperCase() + grupo.mesAno.slice(1)}
          </Text>
          <View style={styles.cardContainer}>
            {grupo.itens.map((item) => {
              const dataFormatada = new Date(item.pedido.data_compra).toLocaleDateString('pt-BR');
              const precoTotal = item.preco_unitario * item.quantidade;
              return (
                <TouchableOpacity
                  key={item.id}
                  // onPress={() => navigation.navigate('DetailsHistory', { orderId: item.id })}
                >
                  <View style={styles.card}>
                    <View style={styles.row}>
                      <LogoPacote width={30} height={30} />
                      <View style={styles.textContainer}>
                        <Text style={styles.bookTitle}>
                          {item.livro?.titulo || 'Livro não disponível'}
                        </Text>
                        <Text style={styles.dateText}>Data: {dataFormatada}</Text>
                        <Text style={styles.priceText}>
                          Preço Unitário: R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
                        </Text>
                        <Text style={styles.priceText}>Quantidade: {item.quantidade}</Text>
                        <Text style={styles.priceText}>
                          Total: R$ {precoTotal.toFixed(2).replace('.', ',')}
                        </Text>
                      </View>
                      <Text style={styles.status}>
                        Status: <Text style={styles.entregue}>Entregue</Text>
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            <Text style={styles.totalMes}>
              Total do mês: R$ {grupo.itens.reduce((soma, item) => soma + item.preco_unitario * item.quantidade, 0).toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View style={{ marginTop: 30 }} />
        </View>
      ))}
    </ScrollView>
  );
}
