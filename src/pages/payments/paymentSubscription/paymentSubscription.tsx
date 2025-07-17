import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from './paymentStyles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";
import PlanCard from "../../../components/CardSubscription/cardSubscription";
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';
import { useBiometria } from '../../../hooks/useBiometria';
import api from "../../../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IconPix from '../assets/Pix.svg';
import IconPixSelected from '../assets/PixSelected.svg';

import { PaymentButton } from '../components/PaymentButton';

type RouteParams = {
    id: string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function PaymentSubscription() {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const price = id === '1' ? 'R$ 15,90/mês' : 'R$ 29,99/mês';

    const [selectedMethod, setSelectedMethod] = useState<'pix' | 'dinheiro' | null>(null);
    const [paymentError, setPaymentError] = useState(false);

    const { autenticarBiometria } = useBiometria();
    const navigation = useNavigation<NavigationProps>();

    const [assinaturaAtiva, setAssinaturaAtiva] = useState<any>(null);

    useEffect(() => {
        verificarAssinatura();
    }, []);

    const verificarAssinatura = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            const response = await api.get('/assinaturas/', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const assinaturas = response.data;

            const ativa = assinaturas.find(
                (a: any) => a.status === 'ativa'
            );

            if (ativa) {
                setAssinaturaAtiva(ativa);
            } else {
                setAssinaturaAtiva(null);
            }
        } catch (error) {
            console.error('Erro ao verificar assinatura:', error);
            Alert.alert('Erro', 'Erro ao verificar assinatura');
        }
    };

    const cancelarAssinatura = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                Alert.alert('Erro', 'Usuário não autenticado');
                return;
            }

            await api.delete(`/assinaturas/${assinaturaAtiva.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            Alert.alert('Cancelada', 'Sua assinatura foi cancelada com sucesso.');
            setAssinaturaAtiva(null);
        } catch (error) {
            console.error('Erro ao cancelar assinatura:', error);
            Alert.alert('Erro', 'Não foi possível cancelar a assinatura.');
        }
    };

    const handleConfirmar = async () => {
        const sucesso = await autenticarBiometria();

        if (!sucesso) return;

        if (assinaturaAtiva) {
            await cancelarAssinatura();
        } else {
            navigation.navigate('QrCode', {id: id, valorTotal: price});
        }
    };

    // Texto do botão dinâmico
    const getBotaoTexto = () => {
        if (assinaturaAtiva) {
            if (assinaturaAtiva.tipo_assinatura === 'Básica') return 'CANCELAR PLANO 1';
            if (assinaturaAtiva.tipo_assinatura === 'Premium') return 'CANCELAR PLANO 2';
            return 'CANCELAR ASSINATURA';
        }
        return 'CONFIRMAR';
    };

    // Texto de alerta assinatura ativa
    const getTextoAssinaturaAtiva = () => {
        if (!assinaturaAtiva) return '';

        if (assinaturaAtiva.tipo_assinatura === 'Básica') {
            return 'Você já possui uma assinatura ativa no PLANO 1.';
        }
        if (assinaturaAtiva.tipo_assinatura === 'Premium') {
            return 'Você já possui uma assinatura ativa no PLANO 2.';
        }
        return 'Você já possui uma assinatura ativa.';
    };

    return (
        <View style={styles.container}>
            <NavigationHeader 
                iconArrow={true}
                title="PAGAMENTO"
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Plano Selecionado */}
                <View style={styles.planContainer}>
                    <PlanCard 
                        id={id}
                        planSelected={id}
                        faixaWidth={248}
                    />
                </View>

                {/* Método de Pagamento */}
                <View style={styles.paymentSection}>
                    <View style={styles.divider} />

                    <Text style={styles.paymentLabel}>Método de Pagamento:</Text>

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

                    <View style={styles.divider} />
                    
                    {/* Aviso de assinatura ativa */}
                    {assinaturaAtiva && (
                        <Text style={{ 
                            color: 'red', 
                            fontSize: 14, 
                            marginBottom: 12,
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            {getTextoAssinaturaAtiva()}
                        </Text>
                    )}
                    <Text style={styles.totalText}>
                        Pagamento Total: <Text style={styles.price}>{price}</Text>
                    </Text> 

                    {paymentError && (
                        <Text style={[styles.errorText, { marginTop: 10 }]}>
                            Por favor, selecione uma forma de pagamento antes de continuar.
                        </Text>
                    )}

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.submitButton}
                            onPress={async () => {
                                if (!assinaturaAtiva && !selectedMethod) {
                                    setPaymentError(true);
                                    return;
                                }
                            
                                setPaymentError(false);
                            
                                if (assinaturaAtiva) {
                                    await cancelarAssinatura();
                                } else {
                                    await handleConfirmar();
                                }
                            }}
                        >
                            <Text style={styles.submitText}>
                                {getBotaoTexto()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
