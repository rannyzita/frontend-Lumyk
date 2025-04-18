import { StyleSheet } from "react-native";
import { themes } from '../../global/themes'

const stylesModal = StyleSheet.create({
    dropdownButton: {
        backgroundColor: themes.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    dropdownButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 8,
    },
    dropdownContent: {
        marginTop: 2,
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        width: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // pra Android
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff33', // um branco semi-transparente
    },
    dropdownItemText: {
        color: '#fff',
        fontSize: 14,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
});

export default stylesModal;
