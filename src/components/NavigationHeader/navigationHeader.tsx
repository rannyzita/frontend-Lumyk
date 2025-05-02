// components/NavigationHeader.tsx
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowNavigation from "../../assets/iconsNavigation/HeaderNavigation/Seta Voltar.svg";
import { styles } from './styles';

interface NavigationHeaderProps {
    onBack?: () => void;
    title?: string;
    iconArrow?: boolean
};

export default function NavigationHeader({ onBack, title, iconArrow }: NavigationHeaderProps) {
    const navigation = useNavigation();

    const handleGoBack = () => {
        if (onBack) {
            onBack();
        } else {
        navigation.goBack(); 
        }
    };

    return (
        <View style={styles.navigationHeader}>
            <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                {iconArrow && (
                    <ArrowNavigation width={25} height={25} />
                )}
            </TouchableOpacity>

            {title && <Text style={styles.title}>{title}</Text>}
        </View>
    );
};

