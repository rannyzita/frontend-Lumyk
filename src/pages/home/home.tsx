import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';

import { useNavigation } from "@react-navigation/native";
import { themes } from '../../global/themes';
import stylesModal from './stylesModal'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import LumykWhiteIcon from '../../assets/logoWhite.svg';
import ProfileIcon from '../../assets/iconsNavigation/Profile.svg';
import SearchIcon from '../../assets/iconsNavigation/Icone pesquisa.svg';
import ArrowDownIcon from '../../assets/iconFilter.svg'; 

import CustomCheckbox from "../../components/CustomCheckBox/checkBox";
import ButtonFilter from '../../components/ButtonFilter/buttonFilter';
import DropdownFilter from "../../components/Dropdown/dropdown";

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
                                placeholderTextColor={themes.colors.textInput}
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
                        <ButtonFilter
                                title="Ver Autores"
                                onPress={() => navigation.navigate('Authors')}
                                style={{ backgroundColor: '#fff', width: 115 }}
                                textStyle={{ color: '#000', marginRight: 5 }}
                        />
                    </View>

                    {/* Botão Gênero */}
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
                                    style={{
                                        transform: [{ rotate: isGenreDropdownVisible ? '180deg' : '0deg' }],
                                    }}
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
                            onToggleItem={toggleGenreSelection}
                            />
                        )}
                    </View>

                    {/* Botão Calcular Frete */}
                    <View style={{ alignItems: 'center' }}>
                        
                        <ButtonFilter
                            title="Calcular Frete"
                            onPress={() => {
                                setStateDropdownVisible(!isStateDropdownVisible);
                                setGenreDropdownVisible(false);
                            }}
                            onLayout={(event) => setStateButtonWidth(event.nativeEvent.layout.width)}
                            icon={
                                <ArrowDownIcon
                                    style={{
                                        marginLeft: 0,
                                        transform: [{ rotate: isStateDropdownVisible ? '180deg' : '0deg' }],
                                    }}
                                    width={14}
                                    height={14}
                                />
                            }
                        />
                        
                        {isStateDropdownVisible && (
                            <DropdownFilter
                                isVisible={isStateDropdownVisible}
                                buttonWidth={stateButtonWidth}
                                items={states}
                                selectedItems={selectedStates}
                                onToggleItem={toggleStateSelection}
                            />
                        )}

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
