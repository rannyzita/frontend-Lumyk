import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.svg';
import styles from './styles';

interface PlanCardProps {
    id: string;
    onSelect?: () => void;
    planSelected?: string;
    faixaWidth?: number;
}

const PlanCard: React.FC<PlanCardProps> = ({ id, onSelect, planSelected, faixaWidth }) => {
    let title = '';
    let price = '';
    let benefits: string[] = [];

    if (id === '1') {
        title = 'Plano 1';
        price = 'R$ 15,90/mês';
        benefits = [
        'Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.',
        ];
    } else if (id === '2') {
        title = 'Plano 2';
        price = 'R$ 29,99/mês';
        benefits = [
        'Isenção do Frete, garantindo que seja cobrado apenas o valor da compra em itens.',
        'Desconto no valor de 20% aplicado automaticamente em todos os livros.',
        ];
    }

    return (
        <View style={styles.card}>
            <View style={[styles.cardPlanos, typeof faixaWidth === 'number' ? { width: faixaWidth } : {}]}>
                <Text style={styles.planTitle}>{title}</Text>
            </View>

            <View style={styles.priceRow}>
                <Text style={styles.price}>{price}</Text>
                <Logo width={45} height={45} />
            </View>

            <View style={styles.benefitsRow}>
                <Text style={styles.benefitsTitle}>Benefícios</Text>
            </View>

            <View style={styles.benefitsContainer}>
                {benefits.map((item, index) => (
                <Text key={index} style={styles.benefitText}>○ {item}</Text>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={onSelect}>
                <Text style={styles.buttonText}>
                    {planSelected ? `Escolhido o Plano ${planSelected}` : `Escolher ${title}`}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PlanCard;
