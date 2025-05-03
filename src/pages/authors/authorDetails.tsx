import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import api from '../../../API/index';
import styles from './stylesAuthorDetails';
import { themes } from '../../global/themes';

type AuthorFromAPI = {
  id: string;
  nome?: string;
  biografia?: string;
  foto?: string;
};

function embaralhar<T>(array: T[]): T[] {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function AuthorDetails() {
  const [authors, setAuthors] = useState<AuthorFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    source={{ uri: api.defaults.baseURL + (author.foto ?? '/imagens/autor_padrao.png') }}
    style={styles.image}
  />
  <Text style={styles.authorName}>{author.nome ?? 'Autor desconhecido'}</Text>
  <View style={styles.buttonContainer}>
    <Text style={styles.buttonText}>Ver livros</Text>
  </View>
</View>

        ))}
      </ScrollView>
    </View>
  );
}
