import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../stylesAuthorDetails';
import api from '../../../../API';

interface Props {
    nome: string;
    biografia: string;
    foto: string;
}

export function AuthorInfoCard({ nome, biografia, foto }: Props) {
    return (
        <View style={styles.authorCard}>
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: api.defaults.baseURL + foto }} style={styles.authorImage} />
                <Text style={styles.authorName}>{nome}</Text>
            </View>
            <View style={styles.authorInfo}>
                <Text style={styles.biographyTitle}>Biografia</Text>
                <Text style={styles.authorBio}>{biografia}</Text>
            </View>
        </View>
    );
}
