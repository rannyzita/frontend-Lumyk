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
        marginTop: 50,
    },
});

export default styles;
