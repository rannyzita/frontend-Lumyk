import { StyleSheet } from "react-native";
import { themes } from "../../global/themes"; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D7BFFF', 
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    qrContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 4,
    },
    qrImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    instruction: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
        marginBottom: 15,
    },
    codeBox: {
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    codeText: {
        flex: 1,
        fontSize: 12,
        color: '#555',
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: '#B97CFC',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default styles;
