import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles';

interface Props {
    title: string;
    price: string;
    selected: boolean;
    onPress: () => void;
}

export function BookFormatOption({ title, price, selected, onPress }: Props) {
    return (
        <TouchableOpacity
            style={[styles.formatButton, selected && styles.selectedButton]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.formatTitle}>{title}</Text>
            <View style={styles.separator} />
            <View style={styles.formatContent}>
                <View style={styles.circle}>
                {selected && <View style={styles.filledCircle} />}
                </View>
                <Text style={styles.priceText}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
}
