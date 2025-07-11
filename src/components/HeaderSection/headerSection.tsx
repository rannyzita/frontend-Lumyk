import React from 'react';
import { View, Text, } from 'react-native';
import { styles } from './styles';
interface HeaderSectionProps {
    title: string;
}

export default function HeaderSection({ title }: HeaderSectionProps) {
    return (
        <View style={styles.headerBox}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}