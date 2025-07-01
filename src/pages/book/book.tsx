import React, { useRef, useState, useEffect } from 'react';
import { Image, ScrollView, Text, UIManager, View, findNodeHandle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import FeedbackCardAdd from '../../components/feedbackButton/feedbackButton';

import { useBookData } from './hooks/useBookData';
import { BookFormatOption } from './components/BookFormatOption';
import { CoverSelectModal } from './components/CoverSelectModal';
import { AddToCartButton } from './components/AddToCartButton';
import { BookDescription } from './components/BookDescription';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../API';

import styles from './styles';

type RouteParams = {
    bookId: string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Book() {
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();
    const { bookId } = route.params as RouteParams;

    const { bookData } = useBookData(bookId);

    const [selectedFormat, setSelectedFormat] = useState<'digital' | 'fisico'>('digital');
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showModal, setShowModal] = useState(false);

    const [assinatura, setAssinatura] = useState<'Básica' | 'Premium' | null>(null);

    const buttonRef = useRef(null);

    useEffect(() => {
        async function verificarAssinatura() {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) return;

            try {
                const { data } = await api.get('/assinaturas/', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (data.length > 0) {
                    setAssinatura(data[0].tipo_assinatura);
                } else {
                    setAssinatura(null);
                }
            } catch (error) {
                console.error('Erro ao verificar assinatura:', error);
            }
        }

        verificarAssinatura();
    }, []);

    if (!bookData) return <Text>Carregando...</Text>;

    const openModal = () => {
        if (buttonRef.current) {
            const handle = findNodeHandle(buttonRef.current);
            if (handle) {
                UIManager.measureInWindow(handle, (x, y, _, height) => {
                    setModalPosition({ top: y + height + 8, left: x });
                    setIsModalVisible(true);
                });
            }
        }
    };

    const handleSelectFormat = (format: 'digital' | 'fisico') => {
        setSelectedFormat(format);
        if (format === 'fisico') {
            openModal();
        } else {
            setSelectedCover(null);
        }
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);

    const calcularPrecoFisico = (): string => {
        if (!selectedCover) return 'Selecione a capa';
    
        const precoBase = parseFloat(bookData.preco);
        let precoFinal = precoBase;
    
        if (selectedCover === 'Capa Dura') {
            precoFinal *= 1.3;
        } else if (selectedCover === 'Capa Comum') {
            precoFinal *= 1.15;
        }
    
        if (assinatura === 'Premium') {
            precoFinal *= 0.8;
        }
    
        return `${selectedCover} - ${formatPrice(parseFloat(precoFinal.toFixed(2)))}`;
    };
    
    const calcularPrecoDigital = (): string => {
        const precoBase = parseFloat(bookData.preco);
        const precoFinal = assinatura === 'Premium' ? precoBase * 0.8 : precoBase;
        return formatPrice(parseFloat(precoFinal.toFixed(2)));
    };

    const handleAdicionarCarrinho = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            let idCarrinho: string | null = await AsyncStorage.getItem('idCarrinho');
            
            if (!token) {
                console.warn('Usuário não autenticado.');
                return;
            }
    
            if (!idCarrinho) {
                
                await api.post('/carrinhos/', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            
                const responseId = await api.get('/carrinhos/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
            
                const carrinho = responseId.data?.[0];
                if (carrinho?.id) {
                    idCarrinho = carrinho.id;
                    await AsyncStorage.setItem('idCarrinho', idCarrinho!);
                } else {
                    console.warn('Carrinho criado, mas não encontrado com GET');
                    return;
                }
            }  
    
            const assinaturaRes = await api.get('/assinaturas/', {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const assinaturaTipo = assinaturaRes.data?.[0]?.tipo_assinatura ?? null;
    
            const precoOriginal = parseFloat(bookData.preco);
            let preco_unitario = precoOriginal;

            if (selectedFormat === 'fisico') {
                if (selectedCover === 'Capa Dura') {
                    preco_unitario *= 1.3;
                } else if (selectedCover === 'Capa Comum') {
                    preco_unitario *= 1.15;
                }

                if (assinaturaTipo === 'Premium') {
                    preco_unitario *= 0.8;
                }
            } else {
                if (assinaturaTipo === 'Premium') {
                    preco_unitario *= 0.8;
                }
            }
    
            await api.post('/item-carrinho/', {
                id_carrinho: idCarrinho,
                id_livro: bookId,
                quantidade: 1,
                preco_unitario: parseFloat(preco_unitario.toFixed(2)),
                formato: selectedFormat,
                tipo: selectedFormat === 'fisico' ? selectedCover : null
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            setShowModal(true);
            setTimeout(() => setShowModal(false), 3000);
        } catch (error: any) {
            console.error('Erro ao adicionar ao carrinho:', error.response?.data || error.message);
        }
    };    

    return (
        <>
            <NavigationHeader iconArrow onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={bookData.foto} style={styles.image} />
                <Text style={styles.title}>{bookData.titulo}</Text>
                <Text style={styles.author}>{bookData.autor.nome}</Text>
                <Text style={styles.stock}>{bookData.estoque} unidades</Text>

                <View style={styles.formatContainer}>
                    <BookFormatOption
                        title="Formato Digital"
                        price={calcularPrecoDigital()}
                        selected={selectedFormat === 'digital'}
                        onPress={() => handleSelectFormat('digital')}
                    />
                    <BookFormatOption
                        title="Formato Físico"
                        price={selectedFormat === 'fisico' && selectedCover ? calcularPrecoFisico() : 'Selecione a capa'}
                        selected={selectedFormat === 'fisico'}
                        onPress={() => handleSelectFormat('fisico')}
                        buttonRef={buttonRef}
                    />
                </View>

                <AddToCartButton
                    disabled={bookData.estoque === 0}
                    onPress={handleAdicionarCarrinho}
                />

                <BookDescription
                    description={bookData.sinopse}
                    authorName={bookData.autor.nome}
                    authorImage={bookData.autor.fotoAutor}
                    onViewBooks={() =>
                        navigation.navigate('AuthorDetails', { authorId: bookData.autor.id })
                    }
                />
            </ScrollView>

            <CoverSelectModal
                visible={isModalVisible}
                position={modalPosition}
                preco={bookData.preco}
                selectedCover={selectedCover}
                onSelect={(option) => {
                    setSelectedCover(option);
                    setIsModalVisible(false);
                }}
                onClose={() => setIsModalVisible(false)}
            />

            {showModal && (
                <FeedbackCardAdd
                    title="Adicionado com sucesso!"
                    closeModal={() => setShowModal(false)}
                />
            )}
        </>
    );
}
