import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import styles from './styles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import IconeLocal from '../assets/book/Local.svg';
import ArrowLocal from '../assets/book/Arrow.svg';
import IconMoney from '../assets/Dinheiro.svg';
import IconPix from '../assets/Pix.svg';
import IconMoneySelected from '../assets/MoneySelected.svg';
import IconPixSelected from '../assets/PixSelected.svg';


import { Button } from '../../../components/Button/button';
import { PaymentButton } from '../components/PaymentButton';

import { useBiometria } from '../../../hooks/useBiometria';
import api from "../../../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'PaymentBook'>;

interface LivroSelecionado {
  id: string;
  titulo: string;
  foto: string; 
  quantidade: number;
  preco: number; 
  precoOriginal?: number; 
}

interface Endereco {
  id: string;
  rua: string;
  bairro: string;
  numero: string;
  id_estado: string;
}

interface Estado {
  id: string;
  nome: string;
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

  const [enderecoSelecionado, setEnderecoSelecionado] = useState<Endereco | null>(null);
  const [estados, setEstados] = useState<Estado[]>([]);

  const { autenticarBiometria } = useBiometria();

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await api.get('/estados/', { headers });
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      }
    };

    fetchEstados();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const carregarEnderecoSelecionado = async () => {
        try {
          const idSalvo = await AsyncStorage.getItem('enderecoSelecionadoId');
          if (!idSalvo) {
            setEnderecoSelecionado(null);
            return;
          }
  
          const token = await AsyncStorage.getItem('userToken');
          if (!token) {
            setEnderecoSelecionado(null);
            return;
          }
  
          const headers = { Authorization: `Bearer ${token}` };
          const { data } = await api.get(`/enderecos/${idSalvo}`, { headers });
  
          setEnderecoSelecionado(data);
        } catch (error) {
          console.error('Erro ao carregar endereço selecionado:', error);
        }
      };
  
      carregarEnderecoSelecionado();
    }, [])
  );

  const formatarEndereco = (end: Endereco) => {
    if (!end) return '';
    const nomeEstado = estados.find((e) => e.id === end.id_estado)?.nome || '';
    const partes = [
      end.rua?.trim(),
      end.numero?.toString(),
      end.bairro?.trim(),
      nomeEstado,
    ].filter(Boolean);
    return partes.join(', ');
  };

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
    
    if (!enderecoSelecionado) {
      // Mostre uma mensagem de erro ou bloqueie a navegação
      console.warn('Endereço não selecionado!');
      return;
    }
    console.log(selectedBookIds)
    try {
      navigation.navigate('QrCode', {
        selectedBookIds,
        formaPagamento: selectedMethod,
        enderecoSelecionado,
        valorTotal: subtotalComDesconto + frete,
      });
    } catch (error) {
      console.error('Erro ao iniciar pagamento:', error);
    }
  };  

  return (
    <View style={styles.container}>

      <NavigationHeader title="PAGAMENTO" iconArrow={true} />

      {/* Endereço */}
      <View style={styles.enderecoContainer}>
        <IconeLocal width={25} height={25} />
        <Text style={styles.enderecoTexto}>{enderecoSelecionado
            ? formatarEndereco(enderecoSelecionado)
            : 'Selecione um endereço padrão'}</Text>
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

        <PaymentButton
          title="Pix"
          value="pix"
          selectedValue={selectedMethod}
          onPress={() => {
            setSelectedMethod('pix');
            setPaymentError(false);
          }}
          icon={<IconPix width={24} height={24} />}
          iconSelected={<IconPixSelected width={24} height={24} />}
        />

        <PaymentButton
          title="Dinheiro"
          value="dinheiro"
          selectedValue={selectedMethod}
          onPress={() => {
            setSelectedMethod('dinheiro');
            setPaymentError(false);
            setIsModalVisible(true);
          }}
          icon={<IconMoney width={24} height={24} />}
          iconSelected={<IconMoneySelected width={24} height={24} />}
        />
      </View>

      <View style={[styles.divider, { marginTop: 15 }]} />

      {/* Detalhes do Pagamento */}
      <View style={styles.detalhesContainer}>
        <Text style={styles.textMainDetalhes}>Detalhes do Pagamento:</Text>

        <View style={{ marginBottom: 20 }}>
          <View style={styles.rowBetween}>
            <Text style={styles.textoDetalhe}>Quantidade de Itens:</Text>
            <Text style={[styles.textoDetalhe, styles.bold]}>{totalItens}</Text>
          </View>

          <View style={styles.rowBetween}> 
            <Text style={styles.textoDetalhe}>Total do Frete:{' '}</Text>
            <Text style={styles.bold}>{frete === 0 ? 'Frete grátis' : `R$ ${frete.toFixed(2)}`}</Text>
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.textoDetalhe}>Subtotal:{' '}</Text>
            <Text style={styles.bold}>
              {assinatura === 'Premium'
                ? 'R$ ' + subtotalComDesconto.toFixed(2)
                : 'R$ ' + subtotalOriginal.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.rowBetween}>
          <Text style={styles.totalTexto}>Pagamento Total:{' '}</Text>
          <Text style={styles.totalValor}>R$ {(subtotalComDesconto + frete).toFixed(2)}</Text>
        </View>

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
