import { StyleSheet } from 'react-native';
import { themes } from '../../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk, 
        paddingTop: 8
    },
    divider:{
        height: 1,
        backgroundColor: '#C3A9E2', 
        marginVertical: 5, 
    },
    enderecoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginVertical: 10,
        gap: 6,
    },
    enderecoTexto: {
        flex: 1,
        color: '#333',
        fontSize: 14,
    },
    listaCarrinho: {
        marginVertical: 10,
    },
    imagemItem: {
        width: 90,
        height: 130,
        marginRight: 10,
        
    },
    tituloSecao: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    metodoContainer: {
        borderRadius: 12,
        padding: 5,
        gap: 10,
        marginTop: 6,
        marginBottom:5
    },
    metodoOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    textoMetodo: {
        fontSize: 14,
        color: '#333',
    },
    detalhesContainer: {
        paddingHorizontal:30,
        padding: 12,
    },
    textMainDetalhes:{
        fontSize:16,
        marginBottom:5
    },
    textoDetalhe: {
        fontSize: 14,
        color: '#333',
        marginVertical: 2,
    },
    bold: {
        fontWeight: 'bold',
    },
    totalTexto: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#000',
    },
    totalValor: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    botaoContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        gap: 10,
        boxShadow: themes.colors.shadow
    },
    paymentText: {
        fontSize: 16,
        color: '#000',
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
    errorText: {
        color: 'red',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
    },
    boxModal: {
        backgroundColor: '#fff',
        width: '85%',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    titleModal: {
        width: '100%',
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 12,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    confirmButtonModal: {
        backgroundColor: themes.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 12,
        elevation: 4,
    }
});

export default styles;
