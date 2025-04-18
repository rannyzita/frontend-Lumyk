import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import stylesModal from './stylesModal';
import { useNavigation } from "@react-navigation/native";
import { themes } from '../../global/themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import LumykWhiteIcon from '../../assets/logoWhite.svg';
import ProfileIcon from '../../assets/iconsNavigation/Profile.svg';
import SearchIcon from '../../assets/iconsNavigation/Icone pesquisa.svg';
import ArrowDownIcon from '../../assets/iconFilter.svg'; // sua setinha

import CustomCheckbox from "../../components/CustomCheckBox/checkBox";

type NavigationProps = StackNavigationProp<RootStackParamList, 'Profile', 'Authors'>;

export default function Home() {
    const navigation = useNavigation<NavigationProps>();

    const [isGenreDropdownVisible, setGenreDropdownVisible] = useState(false);
    const [isStateDropdownVisible, setStateDropdownVisible] = useState(false);
    const [genreButtonWidth, setGenreButtonWidth] = useState(0);
    const [stateButtonWidth, setStateButtonWidth] = useState(0);

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [selectedStates, setSelectedStates] = useState<string[]>([]);

    const genres = ['Romance', 'Ficção', 'Fantasia', 'Biografia'];
    const states = ['São Paulo', 'Amazonas', 'Rio Grande do Sul', 'Ceará'];

    const books = [
        { id: '1', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 'R$ 32,50', freight: 'R$ 33,00', image: require('../../assets/book.jpg') },
        { id: '2', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 'R$ 32,50', freight: 'R$ 33,00', image: require('../../assets/book.jpg') },
    ];

    function toggleGenreSelection(genre: string) {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(item => item !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }
    }
    
    function toggleStateSelection(state: string) {
        if (selectedStates.includes(state)) {
            setSelectedStates(selectedStates.filter(item => item !== state));
        } else {
            setSelectedStates([...selectedStates, state]);
        }
    }    

    function closeDropdowns() {
        setGenreDropdownVisible(false);
        setStateDropdownVisible(false);
    }

    return (
        <TouchableWithoutFeedback onPress={closeDropdowns}>
            <View style={{ backgroundColor: themes.colors.backgroundLumyk, flex: 1 }}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <View style={styles.topBarContent}>
                        <View>
                            <LumykWhiteIcon style={{ marginLeft: -5 }} />
                        </View>

                        <View style={styles.searchContainer}>
                            <TouchableOpacity>
                                <SearchIcon width={20} height={20} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Digite o título do livro aqui..."
                                placeholderTextColor='#969696'
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                            <ProfileIcon style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Filtros */}
                <View style={[stylesModal.filters]}>
                    {/* Botão "Ver Autores" isolado */}
                    <View style={{ alignItems: 'center', marginRight:4, marginLeft:10 }}>
                        <TouchableOpacity
                            style={[stylesModal.dropdownButton, {backgroundColor:'#fff', width:115}]}
                            onPress={() => navigation.navigate('Authors')}
                        >
                            <View style={stylesModal.buttonContent}>
                                <Text style={[stylesModal.dropdownButtonText, {color:'#000', marginLeft:1}]}>Ver Autores</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Botão Gênero */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={stylesModal.dropdownButton}
                            onLayout={(event) => setGenreButtonWidth(event.nativeEvent.layout.width)}
                            onPress={() => {
                                setGenreDropdownVisible(!isGenreDropdownVisible);
                                setStateDropdownVisible(false);
                            }}
                        >
                            <View style={[stylesModal.buttonContent, {width:45}]}>
                                <Text style={[stylesModal.dropdownButtonText, {marginLeft:-6}]}>Gênero</Text>
                                <ArrowDownIcon
                                    style={{
                                        marginLeft: 8, // espaço entre o texto e o ícone
                                        transform: [{ rotate: isGenreDropdownVisible ? '180deg' : '0deg' }],
                                    }}
                                    width={14}
                                    height={14}
                                />
                            </View>
                        </TouchableOpacity>

                        {isGenreDropdownVisible && (
                            <View style={[stylesModal.dropdownContent, { width: genreButtonWidth }]}>
                                <FlatList
                                    data={genres}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={stylesModal.dropdownItem}
                                            onPress={() => toggleGenreSelection(item)}
                                        >
                                            <Text style={stylesModal.dropdownItemText}>{item}</Text>
                                            <CustomCheckbox
                                                checked={selectedGenres.includes(item)}
                                                onPress={() => toggleGenreSelection(item)}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>

                    {/* Botão Calcular Frete */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={stylesModal.dropdownButton}
                            onLayout={(event) => setStateButtonWidth(event.nativeEvent.layout.width)}
                            onPress={() => {
                                setStateDropdownVisible(!isStateDropdownVisible);
                                setGenreDropdownVisible(false);
                            }}
                        >
                            <View style={stylesModal.buttonContent}>
                                <Text style={stylesModal.dropdownButtonText}>Calcular Frete</Text>
                                <ArrowDownIcon
                                    style={{
                                        marginLeft: 8, // espaço entre o texto e o ícone
                                        transform: [{ rotate: isStateDropdownVisible ? '180deg' : '0deg' }],
                                    }}
                                    width={14}
                                    height={14}
                                />
                            </View>
                        </TouchableOpacity>


                        {isStateDropdownVisible && (
                            <View style={[stylesModal.dropdownContent, { width: stateButtonWidth }]}>
                                <FlatList
                                    data={states}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={stylesModal.dropdownItem}
                                            onPress={() => toggleStateSelection(item)}
                                        >
                                            <Text style={stylesModal.dropdownItemText}>{item}</Text>
                                            <CustomCheckbox
                                                checked={selectedStates.includes(item)}
                                                onPress={() => toggleStateSelection(item)}
                                            />
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
