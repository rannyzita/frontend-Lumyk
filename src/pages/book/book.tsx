import React, { useState, useEffect, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Modal, Pressable, UIManager, findNodeHandle } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import { useRoute } from '@react-navigation/native';
import api from '../../../API/index';

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
    const { bookId } = route.params as RouteParams;

    const [selectedFormat, setSelectedFormat] = useState<'digital' | 'fisico'>('digital');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const buttonRef = useRef(null);
    const [bookData, setBookData] = useState<BookData | null>(null);

    useEffect(() => {
        async function fetchBookData() {
            try {
                // Fazendo a requisição para pegar os dados do livro e do autor
                const response = await api.get(`/livros/${bookId}`);
                const book = response.data;

                // Pega a foto do livro e do autor
                const bookImage = { uri: api.defaults.baseURL + book.foto };
                const authorImage = { uri: api.defaults.baseURL + book.autor?.foto };

                console.log('Foto original do autor:', book.autor?.foto);

                console.log('URL da imagem do book:', bookImage);

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
            <NavigationHeader iconArrow={true}/>
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
                        selectedFormat === 'digital' && { paddingVertical: 15 },
                        ]}
                        onPress={() => handleSelectFormat('digital')}
                        activeOpacity={0.8}
                    >
                    <Text style={styles.formatTitle}>Formato Digital</Text>
                    <View style={styles.separator} />
                    <View style={styles.formatContent}>
                        <View style={styles.circle}>
                            {selectedFormat === 'digital' && <View style={styles.filledCircle} />}
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
                    { paddingVertical: selectedFormat === 'fisico' ? 15 : 10 },
                    ]}
                    onPress={() => handleSelectFormat('fisico')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.formatTitle}>Formato Físico</Text>
                    <View style={styles.separator} />
                    <View style={styles.formatContent}>
                        <View style={styles.circle}>
                            {selectedFormat === 'fisico' && <View style={styles.filledCircle} />}
                        </View>
                        <Text style={styles.priceText}>
                            {selectedCover
                            ? `${selectedCover} - ${formatPrice(bookData.physicalOptions.find(opt => opt.type === selectedCover)?.price || '')}`
                            : 'Selecione a capa'}
                        </Text>
                    </View>
                </TouchableOpacity>
                </View>

                <View style={{ marginTop: 15 }}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
                </View>

                <View style={styles.bottomBox}>
                    <Text style={styles.description}>{bookData.sinopse}</Text>
                    <Image source={bookData.autor.fotoAutor} style={styles.bottomImage} />
                    <Text style={styles.bottomText}>Obra feita por: {bookData.autor.nome}</Text>
                    <TouchableOpacity style={styles.viewBooksButton}>
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
                        {bookData.physicalOptions?.map((option: PhysicalOption) => (
                        <TouchableOpacity
                            key={option.type}
                            onPress={() => handleSelectCover(option.type)}
                            style={styles.dropdownItem}
                        >
                            <Text style={styles.dropdownItemText}>
                            {option.type} - {formatPrice(option.price)}
                            </Text>
                            <View style={styles.dropdownCircle}>
                            {selectedCover === option.type && <View style={styles.dropdownFilledCircle} />}
                            </View>
                        </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}
