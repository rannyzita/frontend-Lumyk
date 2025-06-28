import React, { useEffect } from "react";
import { View, Text} from 'react-native';
import stylesDetails from './stylesDetails';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import LogoPacote from './assets/Pacote.svg';
import PacoteEntregue from './assets/PacoteEntregue.svg';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function detailsHistory() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={stylesDetails.container}>
            <Text>Tela de detalhe de algum pedido</Text>
        </View>
    )
};
