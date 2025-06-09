import React from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.svg';
const AnuncioSubscription = require('../../assets/subscription/Resumo plano.png');

export default function Subscription() {
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

                {/* Plano 1 */}
                <View style={styles.card}>
                    <View style={styles.cardPlanos}>
                        <Text style={styles.planTitle}>Plano 1</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>R$ 15,90/mês</Text>
                        <Logo width={45} height={45} />
                    </View>

                    <View style={styles.benefitsRow}>
                        <Text style={styles.benefitsTitle}>Benefícios</Text>
                    </View>
                    
                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitText}>
                            ○ Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Escolher Plano 1</Text>
                    </TouchableOpacity>
                </View>

                {/* Plano 2 */}
                <View style={styles.card}>
                    
                    <View style={styles.cardPlanos}>
                        <Text style={styles.planTitle}>Plano 2</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>R$ 29,99/mês</Text>
                        <Logo width={45} height={45} />
                    </View>

                    <View style={styles.benefitsRow}>
                        <Text style={styles.benefitsTitle}>Benefícios</Text>
                    </View>

                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitText}>
                            ○ Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.
                        </Text>
                        <Text style={styles.benefitText}>
                            ○ Desconto no valor de 20% aplicado automaticamente em todos os livros.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Escolher Plano 2</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
