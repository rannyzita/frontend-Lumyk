import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import api from '../../../API/index';
import styles from './styles';
import { themes } from '../../global/themes';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

type AuthorFromAPI = {
    id: string;
    nome?: string;
    biografia?: string;
    foto?: string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;
function embaralhar<T>(array: T[]): T[] {
    return array
        .map(item => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
}


export default function Authors() {
    const [authors, setAuthors] = useState<AuthorFromAPI[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        async function fetchAuthors() {
            try {
                const response = await api.get('/autores');
                const dados: AuthorFromAPI[] = response.data;
                setAuthors(embaralhar(dados));
            } catch (error) {
                console.error('Erro ao buscar autores:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAuthors();
    }, []);

    if (isLoading) {
        return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <ActivityIndicator size="large" color={themes.colors.purpleDark} />
        </View>
        );
    }

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={styles.title}>LISTA DE AUTORES</Text>
            </View>

            <View style={styles.separator} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {authors.map(author => (
                    <View key={author.id} style={styles.card}>
                        <Image
                            source={{ uri: api.defaults.baseURL! + author.foto }}
                            style={styles.image}
                        />
                        <Text style={styles.authorName}>{author.nome ?? 'Autor desconhecido'}</Text>
                        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('AuthorDetails', {authorId: author.id})}>
                            <Text style={styles.buttonText}>Ver livros</Text>
                        </TouchableOpacity>
                    </View>
            ))}
            </ScrollView>
        </View>
    );
}
