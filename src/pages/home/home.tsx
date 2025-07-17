import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { themes } from '../../global/themes';
import styles from './styles';
import { stylesDropDown } from './components/Dropdown/styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import SearchIcon from './assets/TopBar/Icone pesquisa.svg';
import ArrowDownIcon from './assets/Dropdown/iconFilter.svg';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import CustomCheckbox from "./components/CustomCheckBox/checkBox";
import ButtonFilter from './components/ButtonFilter/buttonFilter';
import DropdownFilter from "./components/Dropdown/dropdown";
import TopBar from './components/TopBar/topBar';
import BookCard from "./components/BookCard/bookCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../../API/index';

import {
    closeDropdowns
} from './functions/index';
import { Float } from "react-native/Libraries/Types/CodegenTypes";

type NavigationProps = StackNavigationProp<RootStackParamList>;

type BookFromAPI = {
    id: string;
    titulo: string;
    preco: string;
    foto: string;
    id_autor: string;
    autor: {
        id: string;
        nome: string;
        biografia: string;
        foto: string;
    };
    id_genero: string;
    genero: {
        id: string;
        nome: string;
    };
};

type EstadoAPI = {
    id: string;
    nome: string;
    taxa_frete: Float;
};

export default function Home() {
    const navigation = useNavigation<NavigationProps>();

    const [isGenreDropdownVisible, setGenreDropdownVisible] = useState(false);
    const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
    const [isLoadingBooks, setIsLoadingBooks] = useState(true);

    const [genreButtonWidth, setGenreButtonWidth] = useState(0);
    const [stateButtonWidth, setStateButtonWidth] = useState(0);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedStates, setSelectedStates] = useState<string[]>(['Ceará']);

    const [books, setBooks] = useState<any[]>([]);
    const [estados, setEstados] = useState<EstadoAPI[]>([]);

    const [searchText, setSearchText] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

    const [estadoSearchText, setEstadoSearchText] = useState('');
    const [generoSearchText, setGeneroSearchText] = useState('');
    const [selectedFreight, setSelectedFreight] = useState(0);
    const [generosAPI, setGenerosAPI] = useState<{ id: string; nome: string }[]>([]);

    function embaralhar<T>(array: T[]): T[] {
        return array
            .map(item => ({ item, sort: Math.random() })) 
            .sort((a, b) => a.sort - b.sort) 
            .map(({ item }) => item);  
    }

    const renderBookItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Book', { bookId: item.id })}>
            <BookCard
                title={item.title}
                author={item.author}
                originalPrice={item.originalPrice}
                discountedPrice={item.discountedPrice}
                freight={item.freight}
                image={item.image}
                temAssinatura={item.AssinaturaPremium}
            />
        </TouchableOpacity>
    );
    
    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                setIsLoadingBooks(true);
                    try {
                        const [livrosRes, estadosRes, generosRes] = await Promise.all([
                            api.get('/livros'),
                            api.get('/estados'),
                            api.get('/generos'),
                    ]);

                const assinatura = await verificarAssinatura();
        
                const livros: BookFromAPI[] = embaralhar(livrosRes.data);
                const estadosAPI: EstadoAPI[] = estadosRes.data;
                setEstados(estadosAPI);
        
                const estadoPadrao = estadosAPI.find(e => e.nome === selectedStates[0]);
                const fretePadrao = estadoPadrao?.taxa_frete ?? 8;
        
                const AssinaturaPremium = assinatura === 'Premium';
                const AssinaturaBasica = assinatura === 'Básica';

                const livrosComDados = livros.map(book => {
                const precoOriginal = parseFloat(book.preco);
                const precoComDesconto = AssinaturaPremium ? precoOriginal * 0.8 : precoOriginal;

                const freight =
                    AssinaturaPremium || AssinaturaBasica
                        ? 'Frete Grátis'
                        : `R$ ${fretePadrao.toFixed(2)}`;

                return {
                    id: book.id,
                    title: book.titulo,
                    author: book.autor?.nome ?? 'Autor desconhecido',
                    originalPrice: `R$ ${precoOriginal.toFixed(2)}`,
                    discountedPrice: AssinaturaPremium
                        ? `R$ ${precoComDesconto.toFixed(2)}`
                        : null,
                    freight,
                    image: { uri: api.defaults.baseURL + book.foto },
                    AssinaturaPremium,
                };
            });

                setGenerosAPI(generosRes.data);
                setBooks(embaralhar(livrosComDados));
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            } finally {
                setTimeout(() => {
                    setIsLoadingBooks(false);
                }, 2000);
            }
        }

        fetchData();
        }, [selectedStates])
    );      
    
    useEffect(() => {
        async function fetchAndFilterBooks() {  
            setIsLoadingBooks(true);
            try {
                const response = await api.get('/livros');
                const livros: BookFromAPI[] = response.data;
    
                const assinatura = await verificarAssinatura();
    
                const estadoSelecionado = estados.find(e => e.nome === selectedStates[0]);
                const frete = estadoSelecionado?.taxa_frete ?? 8;
    
                let livrosFiltrados = livros;
    
                if (selectedGenres.length > 0) {
                    livrosFiltrados = livrosFiltrados.filter(book =>
                        book.genero?.nome === selectedGenres[0]
                    );
                }
    
                const AssinaturaPremium = assinatura === 'Premium';
                const AssinaturaBasica = assinatura === 'Básica';
    
                const livrosComDados = livrosFiltrados.map(book => {
                    const precoOriginal = parseFloat(book.preco);
                    const precoComDesconto = AssinaturaPremium ? precoOriginal * 0.8 : precoOriginal;
    
                    const freight = (AssinaturaPremium || AssinaturaBasica)
                        ? 'Frete Grátis'
                        : `R$ ${frete.toFixed(2)}`;
    
                    return {
                        id: book.id,
                        title: book.titulo,
                        author: book.autor?.nome ?? 'Autor desconhecido',
                        originalPrice: `R$ ${precoOriginal.toFixed(2)}`,
                        discountedPrice: AssinaturaPremium
                            ? `R$ ${precoComDesconto.toFixed(2)}`
                            : null,
                        freight,
                        image: { uri: api.defaults.baseURL + book.foto },
                        AssinaturaPremium,
                    };
                });
    
                setBooks(embaralhar(livrosComDados));
            } catch (error) {
                console.error('Erro ao filtrar livros:', error);
            } finally {
                setTimeout(() => {
                    setIsLoadingBooks(false);
                }, 2000);
            }
        };
    
        fetchAndFilterBooks();
    }, [selectedGenres, selectedStates]);         
    
    useEffect(() => {
        const livrosFiltrados = books.filter(book =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBooks(livrosFiltrados);
    }, [searchText, books]);

    async function verificarAssinatura() {
        const token = await AsyncStorage.getItem('userToken');
    
        try {
            const { data } = await api.get('/assinaturas/', {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            if (data.length === 0) {
                return null; 
            }
    
            return data[0].tipo_assinatura; 
        } catch (error) {
            console.error('Erro ao verificar assinatura:', error);
            return null;
        }
    }
    
    function handleToggleStateSelection(state: string) {
        const isSelected = selectedStates[0] === state;
        
        if (isSelected) {
            setSelectedStates([]);
            setSelectedFreight(8); 
        } else {
            setSelectedStates([state]);
    
            const estadoSelecionado = estados.find(e => e.nome === state);
            setSelectedFreight(estadoSelecionado?.taxa_frete ?? 8);
        }
    }    

    function handleCloseDropdowns() {
        closeDropdowns(setGenreDropdownVisible, setStateDropdownVisible);
    }

    return (
        <SafeAreaView  style={{ flex: 1, backgroundColor: themes.colors.primary }}>
            <StatusBar barStyle="light-content" backgroundColor={themes.colors.primary} />
            <TouchableWithoutFeedback onPress={handleCloseDropdowns}>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <TopBar 
                        navigation={navigation} 
                        title='Digite o titulo do livro aqui...'
                        onSearchTextChange={setSearchText}
                    />

                    <View style={[styles.filters]}>
                        <View style={{ alignItems: 'center', marginRight: 4, marginLeft: 10 }}>
                            <ButtonFilter
                                title="Ver Autores"
                                onPress={() => navigation.navigate('Authors')}
                                style={{ backgroundColor: themes.colors.primary, width: 115 }}
                                textStyle={{ color: '#fff', marginRight: 5 }}
                            />
                        </View>

                        {/* Gênero */}
                        <View style={{ alignItems: 'center' }}>
                            <ButtonFilter
                                title="Gênero"
                                onPress={() => {
                                    setGenreDropdownVisible(!isGenreDropdownVisible);
                                    setStateDropdownVisible(false);
                                }}
                                onLayout={(event) => setGenreButtonWidth(event.nativeEvent.layout.width)}
                                style={{}}
                                contentStyle={{ width: 45 }}
                                textStyle={{ marginLeft: -6 }}
                                icon={
                                    <ArrowDownIcon
                                        style={{ transform: [{ rotate: isGenreDropdownVisible ? '180deg' : '0deg' }] }}
                                        width={14}
                                        height={14}
                                    />
                                }
                            />
                            {isGenreDropdownVisible && (
                                <DropdownFilter
                                    isVisible={isGenreDropdownVisible}
                                    buttonWidth={genreButtonWidth}
                                    items={generosAPI.map(g => g.nome).filter(nome => nome.toLowerCase().includes(generoSearchText.toLowerCase()))}
                                    selectedItems={selectedGenres}
                                    onToggleItem={(nomeSelecionado) => setSelectedGenres((prev) => prev[0] === nomeSelecionado ? [] : [nomeSelecionado])}
                                />
                            )}
                        </View>

                        {/* Estado */}
                        <View style={{ alignItems: 'center' }}>
                            <ButtonFilter
                                title="Calcular Frete"
                                onPress={() => {
                                    setStateDropdownVisible(!isStateDropdownVisible);
                                    setGenreDropdownVisible(false);
                                }}
                                onLayout={(event) => setStateButtonWidth(event.nativeEvent.layout.width)}
                                textStyle={{ marginLeft: -6 }}
                                icon={
                                    <ArrowDownIcon
                                        style={{ transform: [{ rotate: isStateDropdownVisible ? '180deg' : '0deg' }] }}
                                        width={14}
                                        height={14}
                                    />
                                }
                            />
                            {isStateDropdownVisible && (
                                <View style={[stylesDropDown.dropdownContent, { width: stateButtonWidth }]}> 
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                        paddingHorizontal: 8,
                                        height: 30,
                                        marginHorizontal: 8,
                                        marginTop: 10,
                                        gap: 1,
                                    }}>
                                        <SearchIcon width={15} height={15} />
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                fontSize: 12,
                                                color: themes.colors.textInput,
                                                paddingVertical: 0,
                                            }}
                                            placeholder="UF de envio..."
                                            placeholderTextColor={themes.colors.textInput}
                                            value={estadoSearchText}
                                            onChangeText={setEstadoSearchText}
                                        />
                                    </View>

                                    <FlatList
                                        data={estados.map(e => e.nome).filter(nome => nome.toLowerCase().includes(estadoSearchText.toLowerCase()))}
                                        keyExtractor={(item) => item}
                                        style={stylesDropDown.scrollableList}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity onPress={() => handleToggleStateSelection(item)} style={stylesDropDown.dropdownItem}>
                                                <Text style={stylesDropDown.dropdownItemText}>{item}</Text>
                                                <CustomCheckbox
                                                    checked={selectedStates.includes(item)}
                                                    onPress={() => handleToggleStateSelection(item)}
                                                />
                                            </TouchableOpacity>
                                        )}
                                        showsVerticalScrollIndicator={true}
                                    />
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.separator}></View>

                    {isLoadingBooks ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                            <ActivityIndicator size={40} color={themes.colors.primary} />
                            <Text style={{ marginTop: 10 }}>Carregando livros...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredBooks}
                            keyExtractor={(item) => item.id}
                            renderItem={renderBookItem}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                            contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
                        />
                    )}
                </View> 
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
