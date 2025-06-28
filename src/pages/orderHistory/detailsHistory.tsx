import React from "react";
import { View, Text, Image } from 'react-native';
import stylesDetails from './stylesDetails';
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import LogoPacote from './assets/Pacote.svg';
import Livro from './assets/Livro.svg';
import PacoteEntregue from './assets/PacoteEntregue.svg';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteParams = { id: string };

export default function detailsHistory() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();
    const { id } = route.params as RouteParams;

    const ImagemExemplo = require('./assets/A Dança dos Dragões.jpg');

    const pedido = {
        titulo: 'Box O Povo do Ar',
        autor: 'Holly Black',
        preco: 50.00,
        data: '23/02/2025',
        nomeCliente: 'Maria Vitória Ferreira Soares',
        numeroPedido: '12345',
        totalPago: 100.00,
        status: 'Entregue',
    };

    return (
        <View style={stylesDetails.container}>
            <NavigationHeader title='INFORMAÇÕES DA COMPRA' iconArrow={true} />

            {/* Imagem principal */}
            <Image source={ImagemExemplo} style={stylesDetails.banner} resizeMode="contain" />

            {/* Detalhes da Compra */}
            <View style={stylesDetails.card}>
                <Text style={stylesDetails.cardTitle}>Detalhes da Compra:</Text>

                <View style={stylesDetails.row}>
                    <Livro width={24} height={24} />
                    <View style={stylesDetails.textContainer}>
                        <Text style={stylesDetails.bookTitle}>{pedido.titulo}</Text>
                        <Text style={stylesDetails.author}>{pedido.autor}</Text>
                    </View>
                    <Text style={stylesDetails.price}>R$ {pedido.preco.toFixed(2).replace('.', ',')}</Text>
                </View>

                <View style={[stylesDetails.row, { marginTop: 10 }]}>
                    <LogoPacote width={24} height={24} />
                    <View style={stylesDetails.textContainer}>
                        <Text style={stylesDetails.date}>{pedido.data}</Text>
                        <Text style={stylesDetails.customer}>Nome: {pedido.nomeCliente}</Text>
                    </View>
                    <Text style={stylesDetails.orderNumber}>Pedido {"\n"}#{pedido.numeroPedido}</Text>
                </View>
            </View>

            {/* Informações da Compra */}
            <View style={stylesDetails.card}>
                <Text style={stylesDetails.cardTitle}>Informações da Compra:</Text>

                <View style={stylesDetails.infoRow}>
                    <View style={stylesDetails.infoBox}>
                        <Text style={stylesDetails.infoLabel}>Total Pago</Text>
                        <Text style={stylesDetails.infoValue}>
                            R$ {pedido.totalPago.toFixed(2).replace('.', ',')}
                        </Text>
                    </View>
                    <View style={stylesDetails.infoBox}>
                        <Text style={stylesDetails.infoLabel}>Envio</Text>
                        <View style={stylesDetails.statusRow}>
                            <Text style={stylesDetails.infoValue}>{pedido.status}</Text>
                            <PacoteEntregue width={25} height={25} style={{ marginLeft: 10 }} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
