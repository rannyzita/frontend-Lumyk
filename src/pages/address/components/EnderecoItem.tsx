import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Trash from '../assets/Trash.svg';
import styles from '../styles';

interface Props {
    id: string;
    texto: string;
    selecionado: boolean;
    onSelecionar: () => void;
    onRemover: () => void;
}

export default function EnderecoItem({ id, texto, selecionado, onSelecionar, onRemover }: Props) {
    return (
        <View style={styles.enderecoItem}>
            <TouchableOpacity
                onPress={onSelecionar}
                style={[
                    styles.checkbox,
                    { width: 28, height: 28, marginRight: 10 },
                    selecionado && styles.checkboxSelected,
                ]}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.enderecoText}>{texto}</Text>
            </View>
            <TouchableOpacity onPress={onRemover}>
                <Trash width={20} height={20} />
            </TouchableOpacity>
        </View> 
    );
}
