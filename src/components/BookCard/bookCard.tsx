import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './styles';

interface BookCardProps {
    title: string;
    author: string;
    price: string;
    freight: string;
    image: any;
};

const BookCard: React.FC<BookCardProps> = ({ title, author, price, freight, image }) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
            </View>

            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.author}>{author}</Text>

            <View style={styles.separator} />

            <Text style={styles.price}>{price} <Text style={styles.bruto}>Preço Bruto</Text></Text>
            <Text style={styles.freight}>Frete: {freight}</Text>
        </View>
    );
};

export default BookCard;
