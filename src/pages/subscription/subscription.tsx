import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.svg';
const AnuncioSubscription = require('../../assets/subscription/Resumo plano.png');

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import PlanCard from "../../components/CardSubscription/cardSubscription";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Subscription() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.AssinaturaCard}>
                    <Text style={styles.title}>ASSINATURAS</Text>
                </View>

                {/* Imagem ampliada */}
                <View style={styles.svgContainer}>
                    <ImageBackground
                        source={AnuncioSubscription}
                        resizeMode="contain"
                        style={styles.subscriptionImage}
                    />
                </View>

                <PlanCard
                    title="Plano 1"
                    price="R$ 15,90/mês"
                    benefits={[
                        'Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.'
                    ]}
                    onSelect={() => navigation.navigate('PaymentSubscription', { id: '1' })}
                />

                <PlanCard
                    title="Plano 2"
                    price="R$ 29,99/mês"
                    benefits={[
                        'Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.',
                        'Desconto no valor de 20% aplicado automaticamente em todos os livros.'
                    ]}
                    onSelect={() => navigation.navigate('PaymentSubscription', { id: '2' })}
                />
                
            </ScrollView>
        </View>
    );
}
