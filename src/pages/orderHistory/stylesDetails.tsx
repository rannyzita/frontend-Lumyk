import { StyleSheet } from "react-native";
import { themes } from '../../global/themes';

const stylesDetails = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk,
    },
    banner: {
        width: '90%',
        height: 300,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 60,
        marginBottom: 30
    },
    card: {
        backgroundColor: '#fff',
        margin: 16,
        borderRadius: 12,
        padding: 16,
        boxShadow: themes.colors.shadow,
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    bookTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    author: {
        fontSize: 12,
        color: '#666',
    },
    price: {
        fontWeight: 'bold',
        color: themes.colors.greenDark,
    },
    date: {
        fontSize: 13,
        color: '#333',
    },
    customer: {
        fontSize: 12,
        color: '#777',
    },
    orderNumber: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
        textAlign: 'right',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    infoBox: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        marginHorizontal: 4,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 12,
        color: '#888',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },
});

export default stylesDetails;
