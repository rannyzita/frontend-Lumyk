import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        justifyContent: 'space-between', 
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
        color: 'white',
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#000', 
        marginVertical: 16,         
    },

    paymentOptions: {
        gap: 16,
        marginTop: 24,
    },

    optionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        backgroundColor: 'white',
        elevation: 2,
    },

    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: themes.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: themes.colors.primary,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },

    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },

    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 12,
    },

    moneyLabel: {
        color: themes.colors.primary,
        fontWeight: 'bold',
    },

    moneyIcon: {
        width: 24,
        height: 24,
        tintColor: themes.colors.primary,
    },

    modalQuestion: {
        fontWeight: '600',
        marginTop: 12,
    },

    modalSubtext: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },

    input: {
        backgroundColor: '#ddd',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 20,
    },

    confirmButton: {
        backgroundColor: themes.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 8,
        elevation: 3,
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
        },
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
});

export default styles;
