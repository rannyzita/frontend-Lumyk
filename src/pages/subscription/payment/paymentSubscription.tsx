import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './paymentStyles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";
import PlanCard from "../../../components/CardSubscription/cardSubscription";
import { useRoute } from '@react-navigation/native';

import IconMoney from '../../../assets/subscription/money.svg';
import IconPix from '../../../assets/subscription/pix.svg';

type RouteParams = {
    id: string
}

export default function PaymentSubscription() {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const price = id === '1' ? 'R$ 15,90/mês' : 'R$ 29,99/mês';

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

                    <TouchableOpacity style={styles.paymentOption}>
                        <IconMoney width={24} height={24}/>
                        <Text style={styles.paymentText}>Dinheiro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.paymentOption}>
                        <IconPix width={24} height={24}/>
                        <Text style={styles.paymentText}>Pix</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <Text style={styles.totalText}>
                        Pagamento Total: <Text style={styles.price}>{price}</Text>
                    </Text>

                    <View style={{alignItems: 'center'}}>
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitText}>FAZER PEDIDO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
