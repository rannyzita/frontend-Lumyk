import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import styles from "./stylesPaymentConcluded";
import ConfirmIcon from './assets/confirmPayment.svg'; // Use .png ou .svg via lib

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";


type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function PaymentConcluded() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconWrapper}>
                    <ConfirmIcon />
                </View>
                <Text style={styles.title}>Pagamento efetuado com sucesso!</Text>
                <Text style={styles.message}>
                Agora é só aproveitar seu pedido!
                {"\n"}Obrigado por confiar em nossos serviços e
                {"\n"}esperamos vê-lo novamente em breve!
                </Text>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
