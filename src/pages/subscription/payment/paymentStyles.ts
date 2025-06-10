import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk,
    },
    scrollContent: {
        marginTop: 20,
        padding: 20,
    },
    planContainer: {
        marginBottom: -18,
        alignItems: 'center',
    },
    paymentSection: {
        gap: 10,
    },
    paymentLabel: {
        fontSize: 16,
        color: '#000',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        gap: 10,
    },
    paymentIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    paymentText: {
        fontSize: 16,
        color: '#000',
    },
    totalText: {
        fontSize: 16,
        marginTop:0,
        textAlign: 'right',
        color: '#000',
    },
    price: {
        color: '#000',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: themes.colors.primary,
        padding: 15,
        borderRadius: 15,
        width: 300,
        alignItems: 'center',
        boxShadow: themes.colors.shadow
    },
    submitText: {
        color: '#fff',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#000', 
        marginVertical: 16,         
    },
});

export default styles;
