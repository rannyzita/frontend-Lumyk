import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import CopyIcon from './assets/iconCopy.svg';
import styles from './styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation, useRoute } from '@react-navigation/native';

import ModalFeedback from '../../components/feedbackButton/feedbackButton';
import api from '../../../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = {
    id: string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function QrCode() {
    const pixCode = 'b6f8e2c1-1234-4f9a-b234-9a9c1df...';

    const [showModal, setShowModal] = useState(false);

    const route = useRoute();
    const { id } = route.params as RouteParams;
    const navigation = useNavigation<NavigationProps>();

    const tipoAssinatura = id === '1' ? 'Básica' : 'Premium';
    const precoAssinatura = id === '1' ? 15.90 : 29.99;

    // 📲 Criar assinatura
    const criarAssinatura = async () => {
        const token = await AsyncStorage.getItem('userToken');

        if (id === '3') {
            navigation.navigate('PaymentConcluded');
            return;
        }
        
        if (!token) {
            Alert.alert('Erro', 'Usuário não autenticado!');
            return;
        }

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

            const response = await api.post('/assinaturas', payload, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201 || response.status === 200) {
                navigation.navigate('PaymentConcluded');
            } else {
                Alert.alert('Erro', 'Erro ao criar assinatura.');
            }
        } catch (error) {
            console.error('Erro ao criar assinatura:', error);
            Alert.alert('Erro', 'Não foi possível processar sua assinatura.');
        }
    };

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />
            <View style={styles.qrContainer}>
                <View style={styles.qrBox}>
                    <View style={styles.qrCode}>
                        <QRCode value={pixCode} size={180} />
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
                    onPress={criarAssinatura}
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
