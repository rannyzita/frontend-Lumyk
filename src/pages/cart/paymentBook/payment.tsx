import React from "react";
import { View, Text, Image, FlatList } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

import IconeLocal from './assets/IconeLocal.svg';
import ArrowLocal from './assets/ArrowLocal.svg';
import IconeMoney from '../../../assets/subscription/money.svg';
import IconePix from '../../../assets/subscription/pix.svg';

import { Button } from '../../../components/Button/button';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function About() {
    const imagensCarrinho = [
        require('./assets/A Casa de Hades.jpg'),
        require('./assets/A Dança dos Dragões.jpg'),
        require('./assets/A Fúria dos Reis.jpg'),
        require('./assets/A Guerra dos Tronos.jpg'),
        require('./assets/A Hora da Estrela.jpg'),
        require('./assets/A Marca de Atena.jpg'),
    ];

    return (
        <View style={styles.container}>
            <NavigationHeader title="PAGAMENTO" iconArrow={true} />

            {/* Endereço */}
            <View style={styles.enderecoContainer}>
                <IconeLocal width={25} height={25} />
                <Text style={styles.enderecoTexto}>Rua Machado de Assis, 189, Amanhecer</Text>
                <ArrowLocal width={16} height={16} />
            </View>

            <View style={styles.divider} />
            
            <View style={{paddingHorizontal:30}}>
                <Text style={styles.tituloSecao}>Itens no Carrinho:</Text>
                {/* Lista de Itens no Carrinho */}
                <FlatList
                    data={imagensCarrinho}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listaCarrinho}
                    renderItem={({ item }) => (
                        <Image source={item} style={styles.imagemItem} resizeMode="cover" />
                    )}
                />
            </View>

            <View style={styles.divider} />

            {/* Métodos de Pagamento */}
            <View style={{paddingHorizontal:30}}>
                <Text style={styles.tituloSecao}>Método de Pagamento:</Text>
                <View style={styles.metodoContainer}>
                    <TouchableOpacity style={styles.metodoOpcao}>
                        <Text style={styles.textoMetodo}>Dinheiro</Text>
                        <IconeMoney width={24} height={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.metodoOpcao}>
                        <Text style={styles.textoMetodo}>Pix</Text>
                        <IconePix width={24} height={24} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.divider} />
            
            {/* Detalhes do Pagamento */}
            <View style={styles.detalhesContainer}>
                <Text style={styles.textMainDetalhes}>Detalhes do Pagamento:</Text>

                <View style={{marginBottom:20}}>
                    <Text style={styles.textoDetalhe}>Quantidade de Itens: <Text style={styles.bold}>4</Text></Text>
                    <Text style={styles.textoDetalhe}>Total do Frete: <Text style={styles.bold}>R$ 15,00</Text></Text>
                </View>
                
                
                <Text style={styles.textoDetalhe}>Subtotal: <Text style={styles.bold}>R$ 224,28</Text></Text>

                <View style={styles.divider} />

                <Text style={styles.totalTexto}>Pagamento Total: <Text style={styles.totalValor}>R$ 269,28</Text></Text>
            </View>

            {/* Botão */}
            <View style={styles.botaoContainer}>
                <Button height={45} width={'75%'} text="FAZER PEDIDO" />
            </View>
        </View>
    );
}
