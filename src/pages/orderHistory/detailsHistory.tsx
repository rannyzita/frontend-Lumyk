import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import stylesDetails from './stylesDetails';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../API';

import LogoPacote from './assets/Pacote.svg';
import LivroIcon from './assets/Livro.svg';
import PacoteEntregue from './assets/PacoteEntregue.svg';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';

import { useBookData } from '../book/hooks/useBookData';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import { useAssinatura } from '../../hooks/useAssinatura';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteParams = { orderId: string };

interface Pedido {
  id: string;
  data_compra: string;
  total: number | null;
  taxa_frete: number | null;
}

interface Usuario {
  nome: string;
}

interface ItemPedido {
  id: string;
  id_livro: string;
  id_usuario: string;
  quantidade: number;
  preco_unitario: number;
  formato: string;
  tipo: string;
  pedido: Pedido;
}

export default function DetailsHistory() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();
  const { orderId } = route.params as RouteParams;

  const [item, setItem] = useState<ItemPedido | null>(null);
  const [usuarioNome, setUsuarioNome] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { getTokenAndUserId } = useAuthStorage();
  const assinatura = useAssinatura();

  const bookId = item?.id_livro ?? '';
  const { bookData } = useBookData(bookId);

  useEffect(() => {
    const fetchItemPedido = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        const { data: singleItem } = await api.get<ItemPedido>(`/item-pedido/${orderId}`, { headers });

        const pedidoId = singleItem.pedido.id;
        const { data: itensPedido } = await api.get<ItemPedido[]>(`/item-pedido/pedido/${pedidoId}`, { headers });

        const itemData = itensPedido.find(i => i.id === orderId) || itensPedido[0];
        setItem(itemData);

        if (itemData.id_usuario) {
          const { data: usuarioData } = await api.get<Usuario>(`/usuarios/${itemData.id_usuario}`, { headers });
          setUsuarioNome(usuarioData.nome);
        }

      } catch (error) {
        console.error('Erro ao buscar item do pedido:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemPedido();
  }, [orderId]);

  if (loading || !item || !bookData) {
    return (
      <View style={[stylesDetails.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size='large' color='#8000FF' />
      </View>
    );
  }

  const precoTotal = item.quantidade * item.preco_unitario;
  const imageUrl = bookData.foto?.uri ?? '';
  const totalPedido = item.pedido.total != null ? item.pedido.total : 0;
  const taxaFrete = item.pedido.taxa_frete != null ? item.pedido.taxa_frete : 0;

  const mostrarFreteGratis = assinatura === 'Premium';
  const precoOriginal = precoTotal + taxaFrete;

  return (
    <View style={stylesDetails.container}>
      <NavigationHeader title='INFORMAÇÕES DA COMPRA' iconArrow={true} />

      <Image source={{ uri: imageUrl }} style={stylesDetails.banner} resizeMode='contain' />

      <View style={stylesDetails.card}>
        <Text style={stylesDetails.cardTitle}>Detalhes da Compra:</Text>
        <Text style={stylesDetails.orderNumber}>Item ID: #{item.id}</Text>

        <View style={[stylesDetails.row, { marginTop: 8 }]}>
          <LivroIcon width={24} height={24} />
          <View style={stylesDetails.textContainer}>
            <Text style={stylesDetails.bookTitle}>{bookData.titulo}</Text>
            <Text style={stylesDetails.author}>{bookData.autor.nome}</Text>
          </View>
          <Text style={stylesDetails.price}>
            R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <View style={[stylesDetails.row, { marginTop: 10, alignItems: 'flex-start' }]}>
          <View style={stylesDetails.iconAndInfo}>
            <LogoPacote width={24} height={24} />
            <View style={stylesDetails.purchaseInfo}>
              <Text style={stylesDetails.dateLabel}>Data da compra:</Text>
              <Text style={stylesDetails.date}>
                {new Date(item.pedido.data_compra).toLocaleDateString('pt-BR')}
              </Text>
              <Text style={stylesDetails.customer}>Comprado por: {usuarioNome ?? '...'}</Text>
              <Text style={stylesDetails.customer}>Quantidade: {item.quantidade}</Text>
            </View>
          </View>
        </View>

        <View style={stylesDetails.separator} />

        <View style={stylesDetails.priceInfoContainer}>
          <Text style={stylesDetails.originalPrice}>R$ {precoOriginal.toFixed(2).replace('.', ',')}</Text>
          <Text style={stylesDetails.discountedPrice}>R$ {totalPedido.toFixed(2).replace('.', ',')}</Text>
          {mostrarFreteGratis ? (
            <Text style={stylesDetails.freteGratis}>Frete grátis</Text>
          ) : (
            <Text style={stylesDetails.freteValor}>Frete: R$ {taxaFrete.toFixed(2).replace('.', ',')}</Text>
          )}
        </View>
      </View>

      <View style={stylesDetails.card}>
        <Text style={stylesDetails.cardTitle}>Informações da Compra:</Text>
        <View style={stylesDetails.infoRow}>
          <View style={stylesDetails.infoBox}>
            <Text style={stylesDetails.infoLabel}>Total Pago</Text>
            <Text style={stylesDetails.infoValue}>
              R$ {totalPedido.toFixed(2).replace('.', ',')}
            </Text>
          </View>
          <View style={stylesDetails.infoBox}>
            <Text style={stylesDetails.infoLabel}>Envio</Text>
            <View style={stylesDetails.statusRow}>
              <Text style={stylesDetails.infoValue}>Entregue</Text>
              <PacoteEntregue width={25} height={25} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
