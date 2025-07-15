import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export default StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        width: '70%',
        
         // Sombras suaves estilo iOS/Web
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        // Android
        elevation: 1,
    },
    cardPlanos: {
        backgroundColor: themes.colors.primary,
        width: '117%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8, 
        height: 28,
        marginLeft: -20,
        marginRight: -20,
    },
    planTitle: {
        fontSize: 15,
        color: 'white',
    },
    price: {
        fontSize: 25,
        color: themes.colors.purpleDark,
        fontWeight: 'bold'
    },
    benefitsContainer: {
        marginTop: 5,
        marginBottom: 15,
    },
    benefitsTitle: {
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    benefitsRow: {
        flexDirection: 'row',
        width: 120, 
        borderRadius: 10,
    },
    button: {
        backgroundColor: themes.colors.primary,
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    benefitItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 8,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: themes.colors.purpleDark,
        marginTop: 20,
    },
    benefitText: {
        fontSize: 14,
        color: '#333',
        flexShrink: 1,
    },
});
