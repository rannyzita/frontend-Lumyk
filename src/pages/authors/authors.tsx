import React from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import { RootStackParamList } from '../../routes/types/navigation';

import styles from './styles';
import { themes } from '../../global/themes';
import { useAuthors } from './hooks/useAuthors';
import { AuthorCard } from './components/AuthorCard';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Authors() {
    const { authors, isLoading } = useAuthors();
    const navigation = useNavigation<NavigationProps>();

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={themes.colors.purpleDark} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} onBack={() => navigation.navigate('Main')} />
            
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <Text style={styles.title}>LISTA DE AUTORES</Text>
            </View>

            <View style={styles.separator} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {authors.map(author => (
                    <AuthorCard key={author.id} author={author} />
                ))}
            </ScrollView>
        </View>
    );
}
