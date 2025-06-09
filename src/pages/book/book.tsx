import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Modal, Pressable, UIManager, findNodeHandle } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import { useRoute } from '@react-navigation/native';
import api from '../../../API/index';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<RootStackParamList>;

type RouteParams = {
    bookId: string;
};

type PhysicalOption = {
    type: string;
    price: string;
};

type BookData = {
    id: string;
    titulo: string;
    autor: {
        id: string;
        nome: string;
        fotoAutor: { uri: string }; 
    };
    sinopse: string;
    estoque: number;
    foto: { uri: string }; 
    preco: string;
    formato: string;
    physicalOptions: PhysicalOption[];
    };


export default function Book() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();
    const { bookId } = route.params as RouteParams;

    const [selectedFormat, setSelectedFormat] = useState<'digital' | 'fisico'>('digital');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const buttonRef = useRef(null);
    const [bookData, setBookData] = useState<BookData | null>(null);

    const getTokenAndUserId = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');
    
            return { token, userId };
        } catch (error) {
            console.error('Erro ao recuperar token e ID do usuário:', error);
            return { token: null, userId: null };
        }
    };

    useEffect(() => {
        async function fetchBookData() {
            try {
                const response = await api.get(`/livros/${bookId}`);
                const book = response.data;

                const bookImage = { uri: api.defaults.baseURL + book.foto };
                const authorImage = { uri: api.defaults.baseURL + book.autor?.foto };

            setBookData({
            id: book.id,
            titulo: book.titulo,
            autor: {
                id: book.autor?.id ?? '',
                nome: book.autor?.nome ?? 'Autor desconhecido',
                fotoAutor: authorImage,
            },
            sinopse: book.sinopse,
            estoque: book.estoque,
            foto: bookImage,
            preco: book.preco,
            formato: book.formato,
            physicalOptions: book.physicalOptions,
            });
        } catch (error) {
            console.error('Erro ao buscar o livro:', error);
        }
    }

        fetchBookData();
    }, [bookId]);

    const handleAdicionarCarrinho = async () => {
        const { token, userId } = await getTokenAndUserId();

        if (!token || !userId) return;
    
        try {
          // 1. Criar carrinho
            const carrinhoResponse = await api.post('/carrinhos/', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const carrinhoId = carrinhoResponse.data.id;
            // 2. Adicionar item ao carrinho
            const itemPayload = {
                id_carrinho: carrinhoId,
                id_livro: livroSelecionado.id, // supondo que você tenha um estado chamado livroSelecionado
                formato: selectedFormat,       // "digital" ou "fisico", por exemplo
                tipo: selectedTipo,            // se houver algo como "capa dura", "pocket", etc.
            };

            await api.post('/item-carrinho/', itemPayload, {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            });

            Alert.alert('Sucesso', 'Item adicionado ao carrinho!');
            } catch (error) {
                console.error('Erro ao adicionar ao carrinho:', error);
                Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
            }
    };

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        }).format(parseFloat(price));
    };

    const handleSelectFormat = (format: 'digital' | 'fisico') => {
        setSelectedFormat(format);
        if (format === 'fisico') {
        openModal();
        }
    };

    const handleSelectCover = (option: string) => {
        setSelectedCover(option);
        setIsModalVisible(false);
    };

    const openModal = () => {
        if (buttonRef.current) {
        const handle = findNodeHandle(buttonRef.current);
        if (handle) {
            UIManager.measureInWindow(handle, (x, y, width, height) => {
            setModalPosition({ top: y + height + 8, left: x });
            setIsModalVisible(true);
            });
        }
        }
    };

    if (!bookData) {
        return <Text style={{ margin: 20 }}>Carregando livro...</Text>;
    }

    return (
        <>
            <NavigationHeader iconArrow={true} onBack={()=> navigation.navigate('Main')}/>
                <ScrollView contentContainerStyle={styles.container}>
                    {/* Imagem do livro */}
                    <Image source={bookData.foto} style={styles.image} />
                    
                    <Text style={styles.title}>{bookData.titulo}</Text>

                    {/* Imagem do autor */}
                    {bookData.foto && <Image source={bookData.foto}/>}
                    
                    <Text style={styles.author}>{bookData.autor.nome}</Text>
                    <Text style={styles.stock}>{bookData.estoque} unidades </Text>

                    <View style={styles.formatContainer}>
                    {/* Formato Digital */}
                    <TouchableOpacity
                        style={[
                            styles.formatButton,
                            selectedFormat === 'digital' && styles.selectedButton,
                        
                            ]}
                        onPress={() => handleSelectFormat('digital')}
                        activeOpacity={0.8}
                    >
                    <Text style={styles.formatTitle}>Formato Digital</Text>
                    <View style={styles.separator} />
                    <View style={styles.formatContent}>
                    <View style={styles.circle}>
                        <View style={[
                            styles.filledCircle,
                            selectedFormat !== 'digital' && { opacity: 0 }
                        ]} />
                        </View>

                        <Text style={styles.priceText}>{formatPrice(bookData.preco)}</Text>
                    </View>
                </TouchableOpacity>

                    {/* Formato Físico */}
                    <TouchableOpacity
                        ref={buttonRef}
                        style={[
                            styles.formatButton,
                            selectedFormat === 'fisico' && styles.selectedButton,
                            { paddingVertical: 15 },
                            ]}
                        onPress={() => handleSelectFormat('fisico')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.formatTitle}>Formato Físico</Text>

                        <View style={styles.separator} />

                        <View style={styles.formatContent}>
                            <View style={styles.circle}>
                                <View style={[
                                    styles.filledCircle,
                                    selectedFormat !== 'fisico' && { opacity: 0 } // Oculta, mas mantém espaço
                                ]} />
                            </View>

                            <Text style={styles.priceText}>
                                {selectedCover
                                    ? `${selectedCover} - ${
                                        selectedCover === 'Capa Dura'
                                            ? formatPrice((parseFloat(bookData.preco) * 1.30).toFixed(2))
                                            : formatPrice((parseFloat(bookData.preco) * 1.15).toFixed(2))
                                    }`
                                    : 'Selecione a capa'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                    <TouchableOpacity style={styles.addToCartButton} onPress={handleAdicionarCarrinho}>
                        <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomBox}>
                    <Text style={styles.description}>{bookData.sinopse}</Text>
                    <Image source={bookData.autor.fotoAutor} style={styles.bottomImage} />
                    <Text style={styles.bottomText}>Obra feita por: {bookData.autor.nome}</Text>
                    <TouchableOpacity style={styles.viewBooksButton} onPress={() => navigation.navigate('AuthorDetails', {authorId: bookData.autor.id})}>
                        <Text style={styles.viewBooksButtonText}>Ver livros</Text>
                    </TouchableOpacity>
                </View>
        </ScrollView>

            {/* Modal Dropdown */}
            <Modal
                transparent
                visible={isModalVisible}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <Pressable style={{ flex: 1 }} onPress={() => setIsModalVisible(false)}>
                    <View
                        style={[
                        styles.dropdownContent,
                        { top: modalPosition.top, left: modalPosition.left },
                        ]}
                    >
                        {['Capa Comum', 'Capa Dura'].map((option) => {
                            const multiplier = option === 'Capa Dura' ? 1.30 : 1.15;
                            const adjustedPrice = formatPrice((parseFloat(bookData.preco) * multiplier).toFixed(2));

                            return (
                                <TouchableOpacity
                                    key={option}
                                    onPress={() => handleSelectCover(option)}
                                    style={styles.dropdownItem}
                                >
                                    <Text style={styles.dropdownItemText}>
                                        {option} - {adjustedPrice}
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
        </>
    );
}
