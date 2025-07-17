import { StyleSheet } from "react-native";
import { themes } from "../../../../global/themes";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: 160,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        flexGrow: 1,
        boxShadow: themes.colors.shadow,
        marginTop: 25,
    },
    image: {
        width: 110,
        height: 160,
        marginTop: 15,
        borderRadius: 6,
        marginBottom: 8,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        color: themes.colors.textPlaceHolder,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
        flexWrap: 'wrap',
    },
    author: {
        fontSize: 12,
        color: '#555',
        marginBottom: 4,
        textAlign: 'right',
    },
    originalPrice: {
        fontSize: 12,
        color: 'red',
        textDecorationLine: 'line-through',
        textAlign: 'left',
    },
    discountedPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'left',
    },
    freightGratis: {
        fontSize: 12,
        color: 'green',
        textAlign: 'right',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    freight: {
        fontSize: 12,
        color: themes.colors.textFrete,
        textAlign: 'right',
        textDecorationLine: 'underline',
    },
    separator: {
        height: 3,
        backgroundColor: '#ccc',
        marginVertical: 6,
    },
});
