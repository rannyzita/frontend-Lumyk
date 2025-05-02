// components/NavigationHeader.tsx
import React, { useState } from "react";
import { View, TouchableOpacity, Text, ViewStyle, StyleProp } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckFeedback from '../../assets/iconsNavigation/check-solid 1.svg';
import CloseFeedback from '../../assets/iconsNavigation/x-solid 1.svg';
import { styles } from './styles';

interface NavigationHeaderProps {
    title?: string;
    closeModal?: () => void;
    style?: StyleProp<ViewStyle>; 
};

export default function NavigationHeader({ title, closeModal, style}: NavigationHeaderProps) {
    const navigation = useNavigation();
    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.modalStyle}>
            {/* Ícone de fechar */}
            <TouchableOpacity onPress={closeModal} style={style}>
                <CloseFeedback width={16} height={16}/>
            </TouchableOpacity>

            {/* Texto centralizado */}
            <Text style={{ color: 'white', fontSize: 12, flex: 1, textAlign: 'center' }}>
                {title}
            </Text>

            {/* Ícone de check */}
            <CheckFeedback style={{marginLeft:20}}/>
        </View>
    );
};

