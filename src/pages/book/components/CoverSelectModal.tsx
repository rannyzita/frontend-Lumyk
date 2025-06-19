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
}

export function CoverSelectModal({
    visible,
    position,
    selectedCover,
    onSelect,
    onClose,
    preco,
}: Props) {
    return (
        <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
            <Pressable style={{ flex: 1 }} onPress={onClose}>
                <View style={[styles.dropdownContent, { top: position.top, left: position.left }]}>
                    {['Capa Comum', 'Capa Dura'].map((option) => {
                        const multiplier = option === 'Capa Dura' ? 1.30 : 1.15;
                        const price = (parseFloat(preco) * multiplier).toFixed(2);

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
