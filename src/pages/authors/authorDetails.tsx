import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import api from '../../../API/index';
import styles from './stylesAuthorDetails';
import { themes } from '../../global/themes';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList>;

type Livro = {
  id: string;
  titulo: string;
  sinopse: string;
  foto: string;
  formato: string;
  preco: number;
  id_autor: string;
  autor: {
    nome: string;
    biografia: string;
    foto: string;
  };
};

type RouteParams = {
  authorId: string;
};

export default function AuthorDetails() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const navigation = useNavigation<NavigationProps>();
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute();
  const { authorId } = route.params as RouteParams;

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await api.get('/livros');
        const livrosFiltrados = response.data.filter((livro: Livro) => livro.id_autor === authorId);
        setLivros(livrosFiltrados);
      } catch (error) {
        console.error('Erro ao buscar livros do autor:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [authorId]);

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={themes.colors.purpleDark} />
      </View>
    );
  }

  const autor = livros[0]?.autor;

  return (
    <View style={styles.container}>
      <NavigationHeader iconArrow={true} title='LIVROS DO AUTOR' onBack={()=> navigation.navigate('Authors')}/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {autor && (
          <View style={styles.authorCard}>
            <Image source={{ uri: api.defaults.baseURL + autor.foto }} style={styles.authorImage} />
            <View style={styles.authorInfo}>
              <Text style={styles.authorName}>{autor.nome}</Text>
              <Text style={styles.biographyTitle}>Biografia</Text>
              <Text style={styles.authorBio}>{autor.biografia}</Text>
            </View>
          </View>
        )}

        <Text style={styles.sectionTitle}>DESCUBRA SUAS CRIAÇÕES LITERÁRIAS:</Text>

        {livros.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum livro encontrado para este autor.</Text>
        ) : (
          livros.map(livro => (
            <View key={livro.id} style={styles.bookCard}>
              <Image
                source={{ uri: api.defaults.baseURL + livro.foto }}
                style={styles.bookImage}
              />
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle}>{livro.titulo}</Text>
                <Text style={styles.bookFormat}>{livro.formato}</Text>
                <Text style={styles.bookPrice}>R$ {livro.preco.toFixed(2)}</Text>
                <Text style={styles.bookFormats}>Outros formatos: capa dura, digital</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Book', { bookId: livro.id })}>
                <Text style={styles.buttonText}>Saiba mais</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
