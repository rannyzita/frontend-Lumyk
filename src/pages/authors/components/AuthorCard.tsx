import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { AuthorFromAPI } from '../hooks/useAuthors';
import { RootStackParamList } from '../../../routes/types/navigation';
import styles from '../styles';
import api from '../../../../API';

type NavigationProps = StackNavigationProp<RootStackParamList>;

interface Props {
    author: AuthorFromAPI;
}

export function AuthorCard({ author }: Props) {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: api.defaults.baseURL! + author.foto }}
                style={styles.image}
            />
            <Text style={styles.authorName}>{author.nome ?? 'Autor desconhecido'}</Text>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate('AuthorDetails', { authorId: author.id })}
            >
                <Text style={styles.buttonText}>Ver livros</Text>
            </TouchableOpacity>
        </View>
    );
}
