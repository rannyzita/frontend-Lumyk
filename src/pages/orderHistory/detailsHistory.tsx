import React, { useEffect } from "react";
import { View, Text} from 'react-native';
import stylesDetails from './stylesDetails';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import LogoPacote from './assets/Pacote.svg';
import PacoteEntregue from './assets/PacoteEntregue.svg';
import Livro from './assets/Livro.svg';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

type NavigationProps = StackNavigationProp<RootStackParamList>;

type RouteParams = {
    orderId: string;
};

export default function detailsHistory() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();
    const { orderId } = route.params as RouteParams;

    return (
        <View style={stylesDetails.container}>
            <NavigationHeader title='INFORMAÇÕES DA COMPRA' iconArrow={true}></NavigationHeader>
            <Text>Tela de detalhe de algum pedido</Text>
        </View>
    )
};
