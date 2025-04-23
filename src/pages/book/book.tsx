import React, { useState, useRef } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, Modal, Pressable, UIManager, findNodeHandle } from 'react-native';
import styles from './styles';
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";

export default function Book() {
    const [selectedFormat, setSelectedFormat] = useState<'digital' | 'fisico'>('digital');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCover, setSelectedCover] = useState<string | null>(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const buttonRef = useRef(null);

    const book = {
        id: '1',
        title: 'Orgulho e Preconceito',
        author: 'Jane Austen',
        stock: 32,
        priceDigital: 'R$10,50',
        image: require('../../assets/book.jpg'),
        description: 'A história de Orgulho e Preconceito gira em torno das cinco irmãs Bennet, que viviam na área rural do interior da Inglaterra, no século XVIII. Aborda a questão do sucesso em uma família sem herdeiros homens, dentro de uma sociedade patriarcal, onde o casamento era fundamental para as mulheres.',
        physicalOptions: [
            { type: 'Capa Comum', price: 'R$19,90' },
            { type: 'Capa Dura', price: 'R$50,00' },
        ],
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

    return (
        <>
            <NavigationHeader />
            <ScrollView contentContainerStyle={styles.container}>
                <Image source={book.image} style={styles.image} />

                <Text style={styles.title}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
                <Text style={styles.stock}>{book.stock} unidades (Em estoque)</Text>

                <View style={styles.formatContainer}>
                    {/* Formato Digital */}
                    <TouchableOpacity
                        style={[styles.formatButton, selectedFormat === 'digital' && styles.selectedButton, selectedFormat === 'digital' && { paddingVertical: 15 },]}
                        onPress={() => handleSelectFormat('digital')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.formatTitle}>Formato Digital</Text>
                        <View style={styles.separator} />

                        <View style={styles.formatContent}>
                            <View style={styles.circle}>
                                {selectedFormat === 'digital' && <View style={styles.filledCircle} />}
                            </View>
                            <Text style={styles.priceText}>{book.priceDigital}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Formato Físico */}
                    <TouchableOpacity
                        ref={buttonRef}
                        style={[styles.formatButton, selectedFormat === 'fisico' && styles.selectedButton, { paddingVertical: selectedFormat === 'fisico' ? 15 : 10 }]}
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
                                    ? `${selectedCover} - ${book.physicalOptions.find(opt => opt.type === selectedCover)?.price}`
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
                    <Text style={styles.description}>{book.description}</Text>

                    <Image source={book.image} style={styles.bottomImage} />
                    <Text style={styles.bottomText}>
                        Obra feita por: {book.author}
                    </Text>

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
                        {book.physicalOptions.map((option) => (
                            <TouchableOpacity
                                key={option.type}
                                onPress={() => handleSelectCover(option.type)}
                                style={styles.dropdownItem}
                            >
                                <Text style={styles.dropdownItemText}>
                                    {option.type} - {option.price}
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
};
