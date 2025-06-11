import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text} from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";

import TrashIcon from './assets/Trash.svg';
import api from '../../../API/index';

export default function Cart() {

    const itemCarrinho = async () => {
        try {
            await api.get('/')
        } catch (error) {
            
        }
    }

    return (
        <View style={styles.container}>
            <Text>Tela de Carrinho</Text>
        </View>
    );
};
