import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface Props {
    description: string;
    authorName: string;
    authorImage: any;
    onViewBooks: () => void;
}

export function BookDescription({ description, authorName, authorImage, onViewBooks }: Props) {
    return (
        <View style={styles.bottomBox}>
            <Text style={styles.description}>{description}</Text>
            <Image source={authorImage} style={styles.bottomImage} />
            <Text style={styles.bottomText}>Obra feita por: {authorName}</Text>
            <TouchableOpacity style={styles.viewBooksButton} onPress={onViewBooks}>
                <Text style={styles.viewBooksButtonText}>Ver livros</Text>
            </TouchableOpacity>
        </View>
    );
}
