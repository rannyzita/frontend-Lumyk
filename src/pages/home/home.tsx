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
                <View style={styles.filters}>
                    <TouchableOpacity style={styles.authors} onPress={() => navigation.navigate('Authors')}>
                        <Text>Ver Autores</Text>
                    </TouchableOpacity>

                    {/* Botão Gênero */}
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={stylesModal.dropdownButton}
                            onPress={() => {
                                setGenreDropdownVisible(!isGenreDropdownVisible);
                                setStateDropdownVisible(false);
                            }}
                        >
                            <Text style={stylesModal.dropdownButtonText}>Gênero</Text>
                            <ArrowDownIcon
                                style={{ transform: [{ rotate: isGenreDropdownVisible ? '180deg' : '0deg' }] }}
                                width={16}
                                height={16}
                            />
                        </TouchableOpacity>

                        {isGenreDropdownVisible && (
                        <View style={stylesModal.dropdownContent}>
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
                            onPress={() => {
                                setStateDropdownVisible(!isStateDropdownVisible);
                                setGenreDropdownVisible(false);
                            }}
                        >
                            <Text style={stylesModal.dropdownButtonText}>Calcular Frete</Text>
                            <ArrowDownIcon
                                style={{ transform: [{ rotate: isStateDropdownVisible ? '180deg' : '0deg' }] }}
                                width={16}
                                height={16}
                            />
                        </TouchableOpacity>

                        {isStateDropdownVisible && (
                            <View style={stylesModal.dropdownContent}>
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
