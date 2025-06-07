import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './styles';

import Logo from '../../assets/logo.svg';
import AnuncioSubscription from '../../assets/subscription/Informações do plano.svg';
import IconePlano from '../../assets/subscription/Informações do plano.svg';

export default function Subscription() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.title}>ASSINATURAS</Text>

                {/* Caixa branca com o SVG no topo */}
                <View style={styles.svgContainer}>
                    <AnuncioSubscription width={200} height={180} />
                </View>

                {/* Plano 1 */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.planTitle}>Plano 1</Text>
                        <IconePlano width={30} height={30} />
                    </View>
                    <Text style={styles.price}>R$ 15,90/mês</Text>
                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitsTitle}>Benefícios</Text>
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
                    <View style={styles.cardHeader}>
                        <Text style={styles.planTitle}>Plano 2</Text>
                        <IconePlano width={30} height={30} />
                    </View>
                    <Text style={styles.price}>R$ 29,99/mês</Text>
                    <View style={styles.benefitsContainer}>
                        <Text style={styles.benefitsTitle}>Benefício</Text>
                        <Text style={styles.benefitText}>
                            ○ Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.
                        </Text>
                        <Text style={styles.benefitText}>
                            ○ Desconto no valor de 10% aplicado automaticamente em todos os livros.
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Escolher Plano 2</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Logo width={40} height={40} />
            </View>
        </View>
    );
}
