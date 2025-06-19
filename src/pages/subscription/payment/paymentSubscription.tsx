import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import styles from './paymentStyles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";
import PlanCard from "../../../components/CardSubscription/cardSubscription";
import { useRoute } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";
import { useBiometria } from '../../../hooks/useBiometria'

import IconMoney from '../../../assets/subscription/money.svg';
import IconPix from '../../../assets/subscription/pix.svg';

type RouteParams = {
    id: string
}

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function PaymentSubscription() {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const price = id === '1' ? 'R$ 15,90/mês' : 'R$ 29,99/mês';

    const [selectedMethod, setSelectedMethod] = useState<'dinheiro' | 'pix' | null>(null);
    const [showCashModal, setShowCashModal] = useState(false);
    const { autenticarBiometria } = useBiometria();

    const [paymentError, setPaymentError] = useState(false);

    const navigation = useNavigation<NavigationProps>();

    const handleFinalizarCompra = async () => {
        const sucesso = await autenticarBiometria();
    
        if (!sucesso) {
            return; // Cancelado ou falhou biometria
        }
    
        navigation.navigate('QrCode')
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

                    <TouchableOpacity style={styles.paymentOption} 
                        onPress={() => {
                            setSelectedMethod('pix');
                            setPaymentError(false);
                        }}
                    >
                        <IconPix width={24} height={24}/>
                        <Text style={styles.paymentText}>Pix</Text>

                        <View style={styles.radioCircle}>
                            {selectedMethod === 'pix' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    <View style={styles.divider} />

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
                            onPress={() => {
                                if (!selectedMethod) {
                                    setPaymentError(true);
                                } else {
                                    setPaymentError(false);
                                    handleFinalizarCompra();
                                }
                            }}
                        >
                            <Text style={styles.submitText}>FAZER PEDIDO</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};
