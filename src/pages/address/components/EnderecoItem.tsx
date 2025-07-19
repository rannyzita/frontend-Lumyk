import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Trash from '../assets/TrashCart.svg';
import styles from '../styles';

interface Props {
    id: string;
    texto: string;
    selecionado: boolean;
    onSelecionar: () => void;
    onRemover: () => void;
    onEditar: () => void;
}

export default function EnderecoItem({ id, texto, selecionado, onSelecionar, onRemover, onEditar }: Props) {
    return (
        <View style={styles.enderecoItem}>
            <TouchableOpacity
                onPress={onSelecionar}
                style={[
                    styles.checkbox,
                    { width: 25, height: 25, marginRight: 20 },
                    selecionado && styles.checkboxSelected,
                ]}
            />
            <TouchableOpacity onPress={onEditar}>
                <Text style={[styles.enderecoText, { textDecorationLine: 'underline' }]}>
                    {texto}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRemover}>
                <Trash width={20} height={20} />
            </TouchableOpacity>
        </View> 
    );
}
