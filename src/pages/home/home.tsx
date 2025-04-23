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

// como na table de estados foi esquecido de incluir o atributo, criei
// aqui um objeto com eles 
const fretePorEstado: Record<string, number> = {
    "Ceará": 8,
    "Piauí": 12,
    "Rio Grande do Norte": 12,
    "Paraíba": 12,
    "Pernambuco": 12,
    "Alagoas": 12,
    "Sergipe": 12,
    "Bahia": 15,
    "Maranhão": 18,
    "Amazonas": 25,
    "Roraima": 25,
    "Acre": 25,
    "Rondônia": 25,
    "Pará": 20,
    "Amapá": 20,
    "Tocantins": 18,
    "Goiás": 18,
    "Mato Grosso": 18,
    "Mato Grosso do Sul": 18,
    "Distrito Federal": 18,
    "São Paulo": 20,
    "Rio de Janeiro": 20,
    "Minas Gerais": 20,
    "Espírito Santo": 20,
    "Paraná": 22,
    "Santa Catarina": 22,
    "Rio Grande do Sul": 22,
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

    const [estadoSearchText, setEstadoSearchText] = useState('');
    const [generoSearchText, setGeneroSearchText] = useState('');
    const [selectedFreight, setSelectedFreight] = useState(0);
    const [generosAPI, setGenerosAPI] = useState<{ id: string; nome: string }[]>([]);

    function embaralhar<T>(array: T[]): T[] {
        return array
            .map(item => ({ item, sort: Math.random() })) 
            .sort((a, b) => a.sort - b.sort) 
            .map(({ item }) => item);  // Retorna o item, sem o valor de sorteio
    }
    // padrao sem nada selecionado
    useEffect(() => {
        async function fetchData() {
            try {
                const [livrosRes, estadosRes, generosRes] = await Promise.all([
                    api.get('/livros'),
                    api.get('/estados'),
                    api.get('/generos')
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
                
                setGenerosAPI(generosRes.data)
                setBooks(embaralhar(livrosComDados));
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        }
    
        fetchData();
    }, []);
    
    // usado qnd o genre ou state for modificado
    useEffect(() => {
        async function fetchAndFilterBooks() {
            try {
                const response = await api.get('/livros');
                const livros: BookFromAPI[] = response.data;
    
                const estadoSelecionado = selectedStates[0];
                const frete = fretePorEstado[estadoSelecionado] ?? 0;
    
                let livrosFiltrados = livros;

                if (selectedGenres.length > 0) {
                    livrosFiltrados = livrosFiltrados.filter(book =>
                        book.genero?.nome === selectedGenres[0]
                    );
                }
    
                const livrosComDados = livrosFiltrados.map(book => ({
                    id: book.id,
                    title: book.titulo,
                    author: book.autor?.nome ?? 'Autor desconhecido',
                    price: `R$ ${parseFloat(book.preco).toFixed(2)}`,
                    freight: `R$ ${frete.toFixed(2)}`,
                    image: { uri: api.defaults.baseURL + book.foto }
                }));
                
                setBooks(embaralhar(livrosComDados)); 
            } catch (error) {
                console.error('Erro ao filtrar livros:', error);
            }
        }
    
        fetchAndFilterBooks();
    }, [selectedGenres, selectedStates]);    

    useEffect(() => {
        const estadoSelecionado = selectedStates[0];

        setBooks(prevBooks =>
            prevBooks.map(book => {
                if (!estadoSelecionado) {
                    return {
                        ...book,
                        freight: `R$ 8.00`// ou undefined
                    };
                }

            const valorFrete = fretePorEstado[estadoSelecionado];
            return {
                ...book,
                freight: `R$ ${valorFrete.toFixed(2)}`
                };
            })
            );
        }, [selectedStates]);

    useEffect(() => {
        const livrosFiltrados = books.filter(book =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredBooks(livrosFiltrados);
    }, [searchText, books]);    

    function handleToggleGenreSelection(genre: string) {
        setSelectedGenres(prev => prev[0] === genre ? [] : [genre]);
    }

    function handleToggleStateSelection(state: string) {
        const isSelected = selectedStates[0] === state;
        
        
        if (isSelected) {
            setSelectedStates([]);
            setSelectedFreight(8); 
        } else {
            setSelectedStates([state]);
    
            const freightValue = fretePorEstado[state];
            if (freightValue) {
                setSelectedFreight(freightValue); 
            } else {
                setSelectedFreight(8); 
            }
        }
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
