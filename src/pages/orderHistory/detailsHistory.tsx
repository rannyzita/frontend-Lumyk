import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator } from 'react-native';
import stylesDetails from './stylesDetails';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../../API';

import LogoPacote from './assets/Pacote.svg';
import LivroIcon from './assets/Livro.svg';
import PacoteEntregue from './assets/PacoteEntregue.svg';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

import { useBookData } from '../book/hooks/useBookData';
import { useAuthStorage } from '../../hooks/useAuthStorage';

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteParams = { orderId: string };

interface Pedido {
  data_compra: string;
}

interface Usuario {
  nome: string;
}

interface ItemPedido {
  id: string;
  id_livro: string;
  id_usuario: string;  // campo para id do usuário (ajuste conforme seu backend)
  quantidade: number;
  preco_unitario: number;
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

  // Pega o livro via hook, passando o id do livro (quando disponível)
  const bookId = item?.id_livro ?? '';
  const { bookData } = useBookData(bookId);

  useEffect(() => {
    const fetchItemPedido = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return;

        const headers = { Authorization: `Bearer ${token}` };

        // 1. Buscar item-pedido pelo orderId
        const { data: itemData } = await api.get<ItemPedido>(`/item-pedido/${orderId}`, { headers });
        setItem(itemData);

        // 2. Buscar nome do usuário pelo id_usuario do item
        if (itemData.id_usuario) {
          const { data: usuarioData } = await api.get<Usuario>(`/usuarios/${itemData.id_usuario}`, { headers });
          setUsuarioNome(usuarioData.nome);
        }

      } catch (error) {
        console.error("Erro ao buscar item do pedido ou usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemPedido();
  }, [orderId]);

  if (loading || !item || !bookData) {
    return (
      <View style={[stylesDetails.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8000FF" />
      </View>
    );
  }

  const precoTotal = item.quantidade * item.preco_unitario;

  // Monta URL completa e aplica encode na string da URL
  const baseUrl = 'https://api.seusite.com'; // ajuste aqui sua base real
  const imageUrl = baseUrl + encodeURI(bookData.foto);

  return (
    <View style={stylesDetails.container}>
      <NavigationHeader title='INFORMAÇÕES DA COMPRA' iconArrow={true} />

      {/* Imagem do Livro usando bookData.foto via hook */}
      <Image
        source={{ uri: imageUrl }}
        style={stylesDetails.banner}
        resizeMode="contain"
      />

      {/* Detalhes da Compra */}
      <View style={stylesDetails.card}>
        <Text style={stylesDetails.cardTitle}>Detalhes da Compra:</Text>

        <View style={stylesDetails.row}>
          <LivroIcon width={24} height={24} />
          <View style={stylesDetails.textContainer}>
            <Text style={stylesDetails.bookTitle}>{bookData.titulo}</Text>
            <Text style={stylesDetails.author}>{bookData.autor.nome}</Text>
          </View>
          <Text style={stylesDetails.price}>
            R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
          </Text>
        </View>

        <View style={[stylesDetails.row, { marginTop: 10 }]}>
          <LogoPacote width={24} height={24} />
          <View style={stylesDetails.textContainer}>
            <Text style={stylesDetails.date}>
              {new Date(item.pedido.data_compra).toLocaleDateString('pt-BR')}
            </Text>
            <Text style={stylesDetails.customer}>
              Comprado por: {usuarioNome ?? 'Carregando...'}
            </Text>
          </View>
          <Text style={stylesDetails.orderNumber}>Item ID {"\n"}#{item.id}</Text>
        </View>
      </View>

      {/* Informações da Compra */}
      <View style={stylesDetails.card}>
        <Text style={stylesDetails.cardTitle}>Informações da Compra:</Text>

        <View style={stylesDetails.infoRow}>
          <View style={stylesDetails.infoBox}>
            <Text style={stylesDetails.infoLabel}>Total Pago</Text>
            <Text style={stylesDetails.infoValue}>
              R$ {precoTotal.toFixed(2).replace('.', ',')}
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
