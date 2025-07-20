import React from "react";
import { View, Text, ScrollView, ImageBackground } from 'react-native';
import styles from './styles';

import TextComercial from './assets/Texto.svg'
import Books from './assets/livros.svg';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";
import HeaderSection from "../../components/HeaderSection/headerSection";
import PlanCard from "../../components/CardSubscription/cardSubscription";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Subscription() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <HeaderSection title="ASSINATURA" />

                {/* Imagem ampliada */}
                <View style={styles.svgContainer}>
                    <TextComercial width={205} height={200} />
                    <Books width={125} height={125 } />
                </View>

                <PlanCard id="1" onSelect={() => navigation.navigate('PaymentSubscription', { id: '1' })} />
                <PlanCard id="2" onSelect={() => navigation.navigate('PaymentSubscription', { id: '2' })} /> 
            </ScrollView>
        </View>
    );
}
