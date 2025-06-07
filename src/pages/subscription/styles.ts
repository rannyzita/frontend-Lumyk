import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6D6F2', // roxo claro de fundo
    },
    scroll: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 100,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#7A2EDC',
        marginVertical: 15,
    },
    svgContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderTopWidth: 2,
        borderTopColor: '#B57EDC',
        paddingTop: 10,
    },
    planTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#7A2EDC',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    benefitsContainer: {
        marginBottom: 15,
    },
    benefitsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7A2EDC',
        marginBottom: 5,
    },
    benefitText: {
        fontSize: 13,
        color: '#333',
        marginBottom: 4,
    },
    button: {
        backgroundColor: '#B57EDC',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    }
});

export default styles;
