import React, { useRef, useState } from 'react';
import { Image, ScrollView, Text, UIManager, View, findNodeHandle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import FeedbackCardAdd from '../../components/feedbackButton/feedbackButton';

import { useAuthStorage } from '../../hooks/useAuthStorage';
import { useBookData } from './hooks/useBookData';
import { BookFormatOption } from './components/BookFormatOption';
import { CoverSelectModal } from './components/CoverSelectModal';
import { AddToCartButton } from './components/AddToCartButton';
import { BookDescription } from './components/BookDescription';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

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
    const { getTokenAndUserId } = useAuthStorage();

    const [selectedFormat, setSelectedFormat] = useState<'digital' | 'fisico'>('digital');
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showModal, setShowModal] = useState(false);

    const buttonRef = useRef(null);

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
        if (format === 'fisico') openModal();
    };

    const formatPrice = (price: string) =>
        new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(parseFloat(price));

    const priceFisico = selectedCover
        ? `${selectedCover} - ${
            selectedCover === 'Capa Dura'
            ? formatPrice((parseFloat(bookData.preco) * 1.30).toFixed(2))
            : formatPrice((parseFloat(bookData.preco) * 1.15).toFixed(2))
        }`
        : 'Selecione a capa';

    const handleAdicionarCarrinho = async () => {
        const { token, userId } = await getTokenAndUserId();
        if (!token || !userId) return;
        setShowModal(true);
        setTimeout(() => setShowModal(false), 3000);
    };

    return (
        <>
            <NavigationHeader iconArrow={true} onBack={() => navigation.goBack()} />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={bookData.foto} style={styles.image} />
                <Text style={styles.title}>{bookData.titulo}</Text>

                <Text style={styles.author}>{bookData.autor.nome}</Text>
                <Text style={styles.stock}>{bookData.estoque} unidades</Text>

                <View style={styles.formatContainer}>
                    <BookFormatOption
                        title='Formato Digital'
                        price={formatPrice(bookData.preco)}
                        selected={selectedFormat === 'digital'}
                        onPress={() => handleSelectFormat('digital')}
                    />
                    <BookFormatOption
                        title='Formato Físico'
                        price={priceFisico}
                        selected={selectedFormat === 'fisico'}
                        onPress={() => handleSelectFormat('fisico')}
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
                    onViewBooks={() => navigation.navigate('AuthorDetails', { authorId: bookData.autor.id })}
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
                    title='Adicionado com sucesso!'
                    closeModal={() => setShowModal(false)}
                />
            )}
        </>
    );
}
