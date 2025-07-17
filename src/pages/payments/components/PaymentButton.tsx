import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { themes } from '../../../global/themes';
import styles from './styles';

interface Props {
    title: string;
    value: 'pix' | 'dinheiro';
    selectedValue: 'pix' | 'dinheiro' | null;
    onPress: () => void;
    icon: React.ReactNode;
    iconSelected: React.ReactNode;
}

export function PaymentButton({
    title,
    value,
    selectedValue,
    onPress,
    icon,
    iconSelected
    }: Props) {
    const isSelected = selectedValue === value;

    return (
        <TouchableOpacity
            style={[
                styles.paymentOption,
                isSelected && {
                backgroundColor: themes.colors.purpleDark,
                borderColor: themes.colors.purpleDark,
                }
            ]}
            onPress={onPress}
            >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                {isSelected ? iconSelected : icon}
                <Text
                style={[
                    styles.paymentText,
                    isSelected && { color: 'white' }
                ]}
                >
                {title}
                </Text>
            </View>

            <View
                style={[
                styles.radioCircle,
                isSelected && { backgroundColor: 'white', borderColor: 'white' }
                ]}
            >
                {isSelected && <View style={[styles.radioInner, { backgroundColor: 'white' }]} />}
            </View>
        </TouchableOpacity>
    );
}
