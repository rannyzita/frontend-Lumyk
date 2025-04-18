// components/ButtonFilter.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ViewStyle, TextStyle, LayoutChangeEvent } from 'react-native';
import {styles} from './styles'

interface ButtonFilterProps {
    title: string;
    onPress: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export default function ButtonFilter({ title, onPress, onLayout, style, textStyle, contentStyle, icon}: ButtonFilterProps) {
    return (
        <TouchableOpacity 
            style={[styles.dropdownButton, style]} 
            onLayout={onLayout} 
            onPress={onPress}
        >
            <View style={[styles.buttonContent, contentStyle]}>
                <Text style={[styles.dropdownButtonText, textStyle]}>{title}</Text>
                {icon && <View style={{ marginLeft: 8 }}>{icon}</View>}
            </View>
        </TouchableOpacity>
    );
}


