import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import { RootStackParamList } from '../../routes/types/navigation';
import { themes } from '../../global/themes';
import styles from './stylesAuthorDetails';

import { useAuthorBooks } from './hooks/useAuthorBooks';
import { AuthorInfoCard } from './components/AuthorInfoCard';
import { BookCard } from './components/BookCard';

type RouteParams = {
  authorId: string;
};

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function AuthorDetails() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  const { authorId } = route.params as RouteParams;

  const { livros, isLoading } = useAuthorBooks(authorId);
  const autor = livros[0]?.autor;

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={themes.colors.purpleDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader
        iconArrow={true}
        title="LIVROS DO AUTOR"
        onBack={() => navigation.navigate('Authors')}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {autor && (
          <AuthorInfoCard
            nome={autor.nome}
            biografia={autor.biografia}
            foto={autor.foto}
          />
        )}

        <Text style={styles.sectionTitle}>DESCUBRA SUAS CRIAÇÕES LITERÁRIAS:</Text>

        {livros.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum livro encontrado para este autor.</Text>
        ) : (
          livros.map((livro) => (
            <BookCard
              key={livro.id}
              id={livro.id}
              titulo={livro.titulo}
              foto={livro.foto}
              preco={livro.preco}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}
