import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../../components/NavigationHeader/navigationHeader";

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import IconeLocal from './assets/IconeLocal.svg';
import ArrowLocal from './assets/ArrowLocal.svg';
import IconMoney from '../../../assets/subscription/money.svg';
import IconPix from '../../../assets/subscription/pix.svg';

import { Button } from '../../../components/Button/button';
import { Pressable } from "react-native-gesture-handler";

import { useBiometria } from '../../../hooks/useBiometria';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function About() {

    const navigation = useNavigation<NavigationProps>();

    const imagensCarrinho = [
        require('./assets/A Casa de Hades.jpg'),
        require('./assets/A Dança dos Dragões.jpg'),
        require('./assets/A Fúria dos Reis.jpg'),
        require('./assets/A Guerra dos Tronos.jpg'),
        require('./assets/A Hora da Estrela.jpg'),
        require('./assets/A Marca de Atena.jpg'),
    ];

    const [selectedMethod, setSelectedMethod] = useState<'pix' | 'dinheiro' | null>(null);
    const [paymentError, setPaymentError] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [troco, setTroco] = useState('');
    const { autenticarBiometria } = useBiometria();

    const  handleFazerPedido = async () =>  {
        const sucesso = await autenticarBiometria();
        
        if (!sucesso) return;

        if (!selectedMethod) {
            setPaymentError(true);
            return;   
        }

        navigation.navigate('QrCode', {id: '3'})
        setPaymentError(false);
    }

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
            <View style={{paddingHorizontal:30, gap: 10}}>
                <Text style={styles.tituloSecao}>Método de Pagamento:</Text>

                <TouchableOpacity style={styles.paymentOption} 
                        onPress={() => {
                            setSelectedMethod('pix');
                            setPaymentError(false);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <IconPix width={24} height={24} />
                            <Text style={styles.paymentText}>Pix</Text>
                        </View>

                        <View style={styles.radioCircle}>
                            {selectedMethod === 'pix' && <View style={styles.radioInner} />}
                        </View>
                </TouchableOpacity> 

                <TouchableOpacity style={styles.paymentOption} 
                        onPress={() => {
                            setSelectedMethod('dinheiro');
                            setPaymentError(false);
                            setIsModalVisible(true);
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <IconMoney width={24} height={24}/>
                            <Text style={styles.paymentText}>Dinheiro</Text>
                        </View>

                        <View style={styles.radioCircle}>
                            {selectedMethod === 'dinheiro' && <View style={styles.radioInner} />}
                        </View>
                </TouchableOpacity>
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

                {paymentError && (
                        <Text style={[styles.errorText, { marginTop: 10 }]}>
                            Por favor, selecione uma forma de pagamento antes de continuar.
                        </Text>
                )}
            </View>

            {/* Botão */}
            <View style={styles.botaoContainer}>
                <Button height={45} width={'75%'} text="FAZER PEDIDO" onPress={handleFazerPedido} />
            </View>

            <Modal
                visible={isModalVisible}
                transparent
                animationType="none"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                    <View style={styles.boxModal}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 6 }}>Precisa de troco?</Text>
                        <Text style={{ fontSize: 13, color: '#777', marginBottom: 10 }}>
                            Se não precisar, ignore e clique em confirmar.
                        </Text>

                        <TextInput
                            placeholder="Digite seu troco aqui."
                            placeholderTextColor="#444"
                            style={styles.titleModal}
                            value={troco}
                            onChangeText={setTroco}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            style={styles.confirmButtonModal}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
                );
}
