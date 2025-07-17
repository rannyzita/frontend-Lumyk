// components/CustomCheckbox.tsx
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { styles } from './styles';

interface CustomCheckboxProps {
    checked: boolean;
    onPress: () => void;
};

export default function CustomCheckbox({ checked, onPress }: CustomCheckboxProps) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.checkbox}>
            {checked && <View style={styles.innerCheckbox} />}
        </TouchableOpacity>
    );
};
