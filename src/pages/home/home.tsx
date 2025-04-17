import React, { useEffect } from "react";
import { View, Image, ActivityIndicator, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './styles'
import { useNavigation } from "@react-navigation/native";
import {themes} from '../../global/themes'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import LumykWhiteIcon from '../../assets/logoWhite.svg'
import ProfileIcon from '../../assets/iconsNavigation/Profile.svg'
import SearchIcon from '../../assets/iconsNavigation/Icone pesquisa.svg'
const books = [
    { id: '1', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 'R$ 32,50', freight: 'R$ 33,00', image: require('../../assets/book.jpg') },
    { id: '2', title: 'Orgulho e Preconceito', author: 'Jane Austen', price: 'R$ 32,50', freight: 'R$ 33,00', image: require('../../assets/book.jpg') },
    // pode repetir ou gerar aleatórios para testar
];


type NavigationProps = StackNavigationProp<RootStackParamList, 'Profile'>;
export default function Home() {
    const navigation = useNavigation<NavigationProps>();

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.topBarContent}>
                    <View>
                        <LumykWhiteIcon style={{marginLeft:-5}}/>
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
                    <TouchableOpacity>
                        <ProfileIcon onPress={() => navigation.navigate('Profile')} style={{marginRight:5}}/>  
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.filters}>

            </View>

            <View style={styles.container}>
                <Text>Tela de Home</Text>
            </View>
        </>
    )
}

