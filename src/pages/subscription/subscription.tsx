import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

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

                <PlanCard id="1" onSelect={() => navigation.navigate('PaymentSubscription', { id: '1' })} />
                <PlanCard id="2" onSelect={() => navigation.navigate('PaymentSubscription', { id: '2' })} /> 
            </ScrollView>
        </View>
    );
}
