// components/PlanCard.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Logo from '../../assets/logo.svg'; // ajuste o caminho se necessário
import styles from './styles'

interface PlanCardProps {
    title: string;
    price: string;
    benefits: string[];
    onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, benefits, onSelect }) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardPlanos}>
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
                {benefits.map((item:any, index:any) => (
                    <Text key={index} style={styles.benefitText}>○ {item}</Text>
                ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={onSelect}>
                <Text style={styles.buttonText}>Escolher {title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PlanCard;
