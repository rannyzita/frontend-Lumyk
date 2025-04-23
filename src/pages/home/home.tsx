import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { themes } from '../../global/themes';
import styles from './styles';
import { stylesDropDown } from '../../components/Dropdown/styles';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import SearchIcon from '../../assets/iconsNavigation/Icone pesquisa.svg';
import ArrowDownIcon from '../../assets/iconFilter.svg';

import CustomCheckbox from "../../components/CustomCheckBox/checkBox";
import ButtonFilter from '../../components/ButtonFilter/buttonFilter';
import DropdownFilter from "../../components/Dropdown/dropdown";
import TopBar from '../../components/TopBar/topBar';
import BookCard from "../../components/BookCard/bookCard";

import api from '../../../API/index';

import {
    toggleGenreSelection,
    toggleStateSelection,
    closeDropdowns
} from './functions/index';

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
};

type AutorAPI = {
    id: string;
    nome: string;
    biografia: string;
    foto: string;
};

const fretePorEstado: Record<string, number> = {
    "Ceará": 5,
    "Amazonas": 15,
    "Rio Grande do Sul": 12,
    "São Paulo": 8,
    "Alagoas": 10,
};

export default function Home() {
    const navigation = useNavigation<NavigationProps>();

    const [isGenreDropdownVisible, setGenreDropdownVisible] = useState(false);
    const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
    const [genreButtonWidth, setGenreButtonWidth] = useState(0);
    const [stateButtonWidth, setStateButtonWidth] = useState(0);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedStates, setSelectedStates] = useState<string[]>(['Ceará']);

    const [books, setBooks] = useState<any[]>([]);
    const [estados, setEstados] = useState<EstadoAPI[]>([]);

    const [searchText, setSearchText] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<any[]>([]);

    const genres = ['Romance', 'Ficção', 'Fantasia', 'Biografia'];

    function embaralhar<T>(array: T[]): T[] {
        return array
            .map(item => ({ item, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ item }) => item);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const [livrosRes, estadosRes] = await Promise.all([
                    api.get('/livros'),
                    api.get('/estados')
                ]);
    
                const livros: BookFromAPI[] = embaralhar(livrosRes.data);
                const estadosAPI: EstadoAPI[] = estadosRes.data;
                setEstados(estadosAPI);
    
                const estadoPadrao = selectedStates[0];
                const frete = fretePorEstado[estadoPadrao] ?? 0;
    
                const livrosComDados = livros.map(book => ({
                    id: book.id,
                    title: book.titulo,
                    author: book.autor?.nome ?? 'Autor desconhecido',
                    price: `R$ ${parseFloat(book.preco).toFixed(2)}`,
                    freight: `R$ ${frete.toFixed(2)}`,
                    image: { uri: api.defaults.baseURL + book.foto }
                }));
    
                setBooks(livrosComDados);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        }
    
        fetchData();
    }, []);
    

    useEffect(() => {
        const estadoSelecionado = selectedStates[0];
        const novoFrete = fretePorEstado[estadoSelecionado] ?? 0;

        setBooks(prevBooks =>
            prevBooks.map(book => ({
                ...book,
                freight: `R$ ${novoFrete.toFixed(2)}`
            }))
        );
    }, [selectedStates]);

    useEffect(() => {
        const livrosFiltrados = books.filter(book =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBooks(livrosFiltrados);
    }, [searchText, books]);    

    function handleToggleGenreSelection(genre: string) {
        toggleGenreSelection(genre, selectedGenres, setSelectedGenres);
    }

    function handleToggleStateSelection(state: string) {
        toggleStateSelection(state, selectedStates, setSelectedStates);
    }

    function handleCloseDropdowns() {
        closeDropdowns(setGenreDropdownVisible, setStateDropdownVisible);
    }

    return (
        <TouchableWithoutFeedback onPress={handleCloseDropdowns}>
            <View style={{ backgroundColor: themes.colors.backgroundLumyk, flex: 1 }}>
                <TopBar 
                    navigation={navigation} 
                    title="Digite o titulo do livro aqui..." 
                    onSearchTextChange={setSearchText}
                />

                <View style={[styles.filters]}>
                    <View style={{ alignItems: 'center', marginRight: 4, marginLeft: 10 }}>
                        <ButtonFilter
                            title="Ver Autores"
                            onPress={() => navigation.navigate('Authors')}
                            style={{ backgroundColor: '#fff', width: 115 }}
                            textStyle={{ color: '#000', marginRight: 5 }}
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
                                items={genres}
                                selectedItems={selectedGenres}
                                onToggleItem={handleToggleGenreSelection}
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
                                    />
                                </View>

                                <FlatList
                                    data={estados.map(e => e.nome)}
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

                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        data={filteredBooks}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigation.navigate('Book')}>
                                <BookCard
                                    title={item.title}
                                    author={item.author}
                                    price={item.price}
                                    freight={item.freight}
                                    image={item.image}
                                />
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                        showsVerticalScrollIndicator={true}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
