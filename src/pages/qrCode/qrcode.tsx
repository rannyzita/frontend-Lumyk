import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import CopyIcon from './assets/IconCopy.svg';
import styles from './styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuthStorage } from '../../hooks/useAuthStorage';

import ModalFeedback from '../../components/feedbackButton/feedbackButton';
import api from '../../../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '../../global/themes';

type RouteParamsAssinatura = {
    id: string;
    formaPagamento: 'pix' | 'dinheiro'
};

type RouteParamsLivro = {
    selectedBookIds: string[];
    formaPagamento: 'pix' | 'dinheiro';
    enderecoSelecionado: {
        id: string;
        rua: string;
        bairro: string;
        numero: string;
        id_estado: string;
    };
    valorTotal: number | string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function QrCode() {
    const pixCode = 'b6f8e2c1-1234-4f9a-b234-9a9c1df...';
    const [showModal, setShowModal] = useState(false);
    const { getTokenAndUserId } = useAuthStorage();
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();

    const routeParams = route.params as Partial<RouteParamsAssinatura & RouteParamsLivro> & { valorTotal: number | string };

    const isAssinatura = 'id' in routeParams && !('selectedBookIds' in routeParams);

    const idAssinatura = isAssinatura ? routeParams.id : undefined;

    const rawValor = routeParams?.valorTotal;

    // Converte para número com segurança
    const parsedValor = typeof rawValor === 'number'
      ? rawValor
      : parseFloat((rawValor || '').toString().replace(',', '.'));

    // Evita erro de NaN
    const valorFormatado = !isNaN(parsedValor)
      ? parsedValor.toFixed(2)
      : '0.00';
      
    const tipoAssinatura = idAssinatura === '1' ? 'Básica' : 'Premium';
    const precoAssinatura = idAssinatura === '1' ? 15.90 : 29.99;

    const criarAssinatura = async () => {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) return Alert.alert('Erro', 'Usuário não autenticado!');
        if (idAssinatura === '3') return navigation.navigate('PaymentConcluded');

        try {
            const dataInicio = new Date();
            const dataFim = new Date();
            dataFim.setMonth(dataFim.getMonth() + 1);

            const payload = {
                tipo_assinatura: tipoAssinatura,
                data_inicio: dataInicio.toISOString().split('T')[0],
                data_fim: dataFim.toISOString().split('T')[0],
                status: 'ativa',
                preco_assinatura: precoAssinatura
            };

            const { status } = await api.post('/assinaturas', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (status === 201 || status === 200) {
                navigation.navigate('PaymentConcluded');
            } else {
                Alert.alert('Erro', 'Erro ao criar assinatura.');
            }
        } catch (error) {
            console.error('Erro ao criar assinatura:', error);
            Alert.alert('Erro', 'Não foi possível processar sua assinatura.');
        }
    };

    const confirmarCompraLivro = async () => {
        const {
            selectedBookIds,
            formaPagamento,
            enderecoSelecionado,
            valorTotal
        } = route.params as RouteParamsLivro;

        const { userId } = await getTokenAndUserId();

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) return Alert.alert('Erro', 'Usuário não autenticado!');

            const headers = { Authorization: `Bearer ${token}` };

            const { data: pagamentoCriado } = await api.post(
                '/pagamentos/',
                { forma_pagamento: formaPagamento },
                { headers }
            );

            const { data: pagamentos } = await api.get('/pagamentos/', { headers });

            const ultimoPagamento = pagamentos[pagamentos.length - 1];
            const idPagamento = ultimoPagamento.id;

            const hoje = new Date();
            const dataFormatada = hoje.toISOString().split('T')[0];

            const { data: pedidoCriado } = await api.post(
                '/pedidos/',
                {
                    id_estado: enderecoSelecionado.id_estado,
                    id_usuario: userId,
                    id_endereco: enderecoSelecionado.id,
                    id_pagamento: idPagamento,
                    total: valorTotal,
                    data_compra: dataFormatada,
                },
                { headers }
            );

            const { data: pedidos } = await api.get('/pedidos/', { headers });
            const ultimoPedido = pedidos[pedidos.length - 1];
            const idPedido = ultimoPedido.id;

            const itensSelecionados = await Promise.all(
                selectedBookIds.map(async (idItem) => {
                    const { data } = await api.get(`/item-carrinho/${idItem}`, { headers });
                    return data;
                })
            );

            for (const item of itensSelecionados) {
                await api.post(
                    '/item-pedido/',
                    {
                        id_pedido: idPedido,
                        id_livro: item.id_livro,
                        preco_unitario: item.preco_unitario,
                        quantidade: item.quantidade,
                        formato: item.formato,
                        tipo: item.tipo
                    },
                    { headers }
                );

                await api.delete(`/item-carrinho/${item.id}`, { headers });
            }

            navigation.navigate('PaymentConcluded');
        } catch (error) {
            console.error('Erro ao processar pedido:', error);
            Alert.alert('Erro', 'Não foi possível processar seu pedido.');
        }
    };

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />

            <View style={styles.qrContainer}>
                <View style={styles.qrBox}>
                    <Text style={styles.totalText}>
                      VALOR TOTAL: R$ {valorFormatado}
                    </Text>

                    <View style={{ alignItems: 'center', marginVertical: 25 }}>
                      <QRCode value={pixCode} size={180} color={themes.colors.purpleDark} />
                    </View>

                    <Text style={styles.qrText}>
                        Por favor, escaneie o QR Code ou copie o código abaixo para efetuar o pagamento.
                    </Text>

                    <View style={styles.codeRow}>
                        <Text style={styles.codeText} numberOfLines={1}>{pixCode}</Text>
                        <TouchableOpacity onPress={() => {
                            Clipboard.setStringAsync(pixCode);
                            setShowModal(true);
                        }}>
                            <CopyIcon width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={isAssinatura ? criarAssinatura : confirmarCompraLivro}
                >
                    <Text style={styles.confirmText}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>

            {showModal && (
                <ModalFeedback
                    title='Código copiado com sucesso'
                    closeModal={() => setShowModal(false)}
                    style={{ marginRight: 15 }}
                />
            )}
        </View>
    );
}
