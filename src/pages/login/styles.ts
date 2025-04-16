import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
        alignItems:'center'
    },
    logo: {
        width: 140,
        height: 140,
        alignSelf: 'center',
        marginBottom: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 36,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginBottom: 30,
    },
    label: {
        fontFamily: 'Poppins-Regular',
        marginBottom: 4,
        fontSize:14
    },
    input: {
        backgroundColor: themes.colors.backgroundBoxes,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
        fontFamily: 'Poppins-Regular',
        width:314,
        height: 40
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e2e2e2',
        borderRadius: 10,
        marginBottom: 16,
    },
    button: {
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
    },
    forgotPassword: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        marginBottom: 16,
    },
    link: {
        color: '#6c00ff',
        textDecorationLine: 'underline',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#bdbdbd',
    },
    ou: {
        marginHorizontal: 10,
        fontFamily: 'Poppins-Regular',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    socialText: {
        fontFamily: 'Poppins-Bold',
    },
});

export default styles;
