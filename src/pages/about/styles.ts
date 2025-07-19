import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 20,
        alignItems: 'center',
        backgroundColor: themes.colors.backgroundLumyk,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
    },
    logo: {
        marginVertical: 10,
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
        color: themes.colors.purpleDark,
    },  
    madeByContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },

    madeBy: {
        fontSize: 30,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
        marginBottom: 6,
        textAlign: 'center',
    },
    
    line: {
        width: '70%', 
        height: 2,
        backgroundColor: themes.colors.purpleDark,
        alignSelf: 'center',
    },
    cardWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    
    card: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '85%', 
        maxWidth: 300, 
        gap: 10,
    },
    
    image: {
        width: 55,
        height: 55,
        borderRadius: 50,
        marginRight: 10,
    },
    
    name: {
        fontSize: 14,
        color: themes.colors.purpleDark, 
    },
    
    role: {
        fontSize: 13,
        fontWeight: '600',
        color: themes.colors.purpleDark, 
    },
    
    divider: {
        height: 2,
        backgroundColor: themes.colors.purpleDark,
        width: '70%',
        alignSelf: 'center', 
        marginTop: 10,
    },
    
});

export default styles;
