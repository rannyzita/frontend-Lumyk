import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../styles';

interface Props {
    disabled: boolean;
    onPress?: () => void;
}

export function AddToCartButton({ disabled, onPress }: Props) {
    return (
        <TouchableOpacity
            style={[styles.addToCartButton, disabled && { backgroundColor: 'gray' }]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.addToCartText}>
                {disabled ? 'Sem Estoque' : 'Adicionar ao Carrinho'}
            </Text>
        </TouchableOpacity>
    );
}
