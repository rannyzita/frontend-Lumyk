import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
    },
    logo: {
        marginVertical: 10,
    },
    card: {
        backgroundColor: themes.colors.primary,
        borderRadius: 12,
        padding: 10,
        height: 90,
        marginVertical: 6,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        elevation: 3,
    },
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
    name: {
        fontWeight: '600',
        fontSize: 14,
        color: 'white',
    },
    role: {
        fontSize: 13,
        fontWeight: '500',
        color: '#f0f0f0',
    },
    headerBox: {
        backgroundColor: '#fff',
        paddingVertical: 25,
        width:'100%',
        marginBottom: 10,
        alignItems: 'center',
        boxShadow: themes.colors.shadow
    },
    footerContainer: {
        marginTop: 'auto',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        textAlign: 'center',
        fontSize: 12,
        color: '#555',
    },  
});

export default styles;
