import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../stylesAuthorDetails';
import api from '../../../../API';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/types/navigation';

interface Props {
    id: string;
    titulo: string;
    foto: string;
    preco: number;
}

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function BookCard({ id, titulo, foto, preco }: Props) {
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.bookCard}>
            <Image source={{ uri: api.defaults.baseURL + foto }} style={styles.bookImage} />
            <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{titulo}</Text>
                <Text style={styles.bookFormat}>Digital</Text>
                <Text style={styles.bookPrice}>R$ {preco.toFixed(2)}</Text>
                <Text style={styles.bookFormats}>Outros formatos: capa dura, digital</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Book', { bookId: id })}
            >
                <Text style={styles.buttonText}>Saiba mais</Text>
            </TouchableOpacity>
        </View>
    );
}
