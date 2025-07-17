import React from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

interface BookCardProps {
    title: string;
    author: string;
    originalPrice: string;
    discountedPrice: string;
    freight: string;
    image: any;
    temAssinatura: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
    title,
    author,
    originalPrice,
    discountedPrice,
    freight,
    image,
    temAssinatura
}) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="cover" />
            </View>

            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text style={styles.author}>{author}</Text>

            <View style={styles.separator} />

            {temAssinatura ? (
                <>
                    <Text style={styles.originalPrice}>
                        {originalPrice}
                    </Text>
                    <Text style={styles.discountedPrice}>
                        {discountedPrice}
                    </Text>
                </>
            ) : (
                <Text style={styles.discountedPrice}>
                    {originalPrice}
                </Text>
            )}

            <Text style={freight === 'Frete Grátis' ? styles.freightGratis : styles.freight}>
                {freight === 'Frete Grátis' ? 'Frete Grátis' : `Frete: ${freight}`}
            </Text>
        </View>
    );
};

export default BookCard;
