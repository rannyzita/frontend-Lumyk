import React from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';

interface Props {
    visible: boolean;
    position: { top: number; left: number };
    selectedCover: string | null;
    onSelect: (cover: string) => void;
    onClose: () => void;
    preco: string;
    assinatura: 'Básica' | 'Premium' | null;
}

export function CoverSelectModal({
    visible,
    position,
    selectedCover,
    onSelect,
    onClose,
    preco,
    assinatura,
}: Props) {
    return (
        <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
            <Pressable style={{ flex: 1 }} onPress={onClose}>
                <View style={[styles.dropdownContent, { top: position.top, left: position.left }]}>
                    {['Capa Comum', 'Capa Dura'].map((option) => {
                        const multiplier = option === 'Capa Dura' ? 1.3 : 1.15;
                        let precoFinal = parseFloat(preco) * multiplier;

                        if (assinatura === 'Premium') {
                            precoFinal *= 0.8;
                        }

                        const price = precoFinal.toFixed(2);

                        return (
                            <TouchableOpacity
                                key={option}
                                onPress={() => onSelect(option)}
                                style={styles.dropdownItem}
                            >
                                <Text style={styles.dropdownItemText}>
                                    {option} - R$ {price}
                                </Text>
                                <View style={styles.dropdownCircle}>
                                    {selectedCover === option && <View style={styles.dropdownFilledCircle} />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </Pressable>
        </Modal>
    );
}
