import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import styles from './styles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import IconeLocal from './assets/IconeLocal.svg';
import ArrowLocal from './assets/ArrowLocal.svg';
import IconMoney from '../../../assets/subscription/money.svg';
import IconPix from '../../../assets/subscription/pix.svg';

import { Button } from '../../../components/Button/button';

import { useBiometria } from '../../../hooks/useBiometria';
import api from "../../../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'PaymentBook'>;

interface LivroSelecionado {
  id: string;
  titulo: string;
  foto: string; // url
  quantidade: number;
  preco: number; // preço com desconto se premium
  precoOriginal?: number; // preço original para cálculo
}

export default function PaymentBook() {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const { selectedBookIds } = route.params ?? { selectedBookIds: [] };

  const [livrosSelecionados, setLivrosSelecionados] = useState<LivroSelecionado[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'dinheiro' | null>(null);
  const [paymentError, setPaymentError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [troco, setTroco] = useState('');
  const [assinatura, setAssinatura] = useState<'Básica' | 'Premium' | null>(null);

  const { autenticarBiometria } = useBiometria();

  useEffect(() => {
    const fetchLivrosEAssinatura = async () => {
      try {
        setLoading(true);

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.warn('Token não encontrado');
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Buscar assinatura
        const { data: assinaturaData } = await api.get('/assinaturas/', { headers });
        if (assinaturaData.length > 0) {
          setAssinatura(assinaturaData[0].tipo_assinatura);
        } else {
          setAssinatura(null);
        }

        const livrosData: LivroSelecionado[] = [];

        for (const id of selectedBookIds) {
          const { data: itemCarrinho } = await api.get(`/item-carrinho/${id}`, { headers });
          const { data: livro } = await api.get(`/livros/${itemCarrinho.id_livro}`, { headers });

          const precoOriginal = itemCarrinho.preco_unitario;
          let precoComDesconto = precoOriginal;

          // Aplica desconto 20% só para assinantes Premium
          if (assinaturaData.length > 0 && assinaturaData[0].tipo_assinatura === 'Premium') {
            precoComDesconto = +(precoOriginal * 0.8).toFixed(2);
          }

          livrosData.push({
            id: itemCarrinho.id,
            titulo: livro.titulo,
            foto: api.defaults.baseURL + livro.foto,
            quantidade: itemCarrinho.quantidade,
            preco: precoComDesconto,
            precoOriginal: precoOriginal,
          });
        }

        setLivrosSelecionados(livrosData);
      } catch (error) {
        console.error('Erro ao carregar livros:', JSON.stringify(error, null, 2));
      } finally {
        setLoading(false);
      }
    };

    if (selectedBookIds.length > 0) {
      fetchLivrosEAssinatura();
    } else {
      setLivrosSelecionados([]);
      setLoading(false);
    }
  }, [selectedBookIds]);

  // Calcular totais baseado na assinatura

  // Total itens (quantidade somada)
  const totalItens = livrosSelecionados.reduce((acc, livro) => acc + livro.quantidade, 0);

  // Subtotal sem desconto
  const subtotalOriginal = livrosSelecionados.reduce(
    (acc, livro) => acc + (livro.precoOriginal ?? livro.preco) * livro.quantidade,
    0
  );

  // Subtotal com desconto (se Premium)
  const subtotalComDesconto = livrosSelecionados.reduce(
    (acc, livro) => acc + livro.preco * livro.quantidade,
    0
  );

  // Definir frete grátis se assinatura Básica ou Premium
  const frete = assinatura === 'Básica' || assinatura === 'Premium' ? 0 : 15;

  const handleFazerPedido = async () => {
    if (!selectedMethod) {
      setPaymentError(true);
      return;
    }

    const sucesso = await autenticarBiometria();
    if (!sucesso) return;

    setPaymentError(false);
    navigation.navigate('QrCode', { id: '3' });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#8000FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mantive seu código UI intacto abaixo */}

      <NavigationHeader title="PAGAMENTO" iconArrow={true} />

      {/* Endereço */}
      <View style={styles.enderecoContainer}>
        <IconeLocal width={25} height={25} />
        <Text style={styles.enderecoTexto}>Rua Machado de Assis, 189, Amanhecer</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Address')}>
          <ArrowLocal width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={{ paddingHorizontal: 30 }}>
        <Text style={styles.tituloSecao}>Itens Selecionados:</Text>
        {livrosSelecionados.length === 0 ? (
          <Text>Nenhum livro selecionado.</Text>
        ) : (
          <FlatList
            data={livrosSelecionados}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaCarrinho}
            renderItem={({ item }) => (
              <View style={{ marginRight: 10, alignItems: 'center' }}>
                <Image
                  source={{ uri: item.foto }}
                  style={styles.imagemItem}
                  resizeMode="cover"
                />
                <Text style={{ maxWidth: 100, textAlign: 'center', marginTop: 4 }}>
                  {item.titulo.length > 15
                    ? item.titulo.substring(0, 15) + '...'
                    : item.titulo}
                </Text>
                <Text style={{ color: '#666', fontSize: 12 }}>
                  Qtd: {item.quantidade}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.divider} />

      {/* Métodos de Pagamento */}
      <View style={{ paddingHorizontal: 30, gap: 10 }}>
        <Text style={styles.tituloSecao}>Método de Pagamento:</Text>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            setSelectedMethod('pix');
            setPaymentError(false);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <IconPix width={24} height={24} />
            <Text style={styles.paymentText}>Pix</Text>
          </View>

          <View style={styles.radioCircle}>
            {selectedMethod === 'pix' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.paymentOption}
          onPress={() => {
            setSelectedMethod('dinheiro');
            setPaymentError(false);
            setIsModalVisible(true);
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <IconMoney width={24} height={24} />
            <Text style={styles.paymentText}>Dinheiro</Text>
          </View>

          <View style={styles.radioCircle}>
            {selectedMethod === 'dinheiro' && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Detalhes do Pagamento */}
      <View style={styles.detalhesContainer}>
        <Text style={styles.textMainDetalhes}>Detalhes do Pagamento:</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={styles.textoDetalhe}>
            Quantidade de Itens: <Text style={styles.bold}>{totalItens}</Text>
          </Text>
          <Text style={styles.textoDetalhe}>
            Total do Frete:{' '}
            <Text style={styles.bold}>{frete === 0 ? 'Frete grátis' : `R$ ${frete.toFixed(2)}`}</Text>
          </Text>
        </View>

        <Text style={styles.textoDetalhe}>
          Subtotal:{' '}
          <Text style={styles.bold}>
            {assinatura === 'Premium'
              ? subtotalComDesconto.toFixed(2)
              : subtotalOriginal.toFixed(2)}
          </Text>
        </Text>

        <View style={styles.divider} />

        <Text style={styles.totalTexto}>
          Pagamento Total:{' '}
          <Text style={styles.totalValor}>
            R$ {(subtotalComDesconto + frete).toFixed(2)}
          </Text>
        </Text>

        {paymentError && (
          <Text style={[styles.errorText, { marginTop: 10 }]}>
            Por favor, selecione uma forma de pagamento antes de continuar.
          </Text>
        )}
      </View>

      {/* Botão */}
      <View style={styles.botaoContainer}>
        <Button height={45} width={'75%'} text="FAZER PEDIDO" onPress={handleFazerPedido} />
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <View style={styles.boxModal}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>
              Precisa de troco?
            </Text>
            <Text style={{ fontSize: 13, color: '#777', marginBottom: 10 }}>
              Se não precisar, ignore e clique em confirmar.
            </Text>

            <TextInput
              placeholder="Digite seu troco aqui."
              placeholderTextColor="#444"
              style={styles.titleModal}
              value={troco}
              onChangeText={setTroco}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.confirmButtonModal}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
