import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#ffffff',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 34,
        marginBottom: 80
    },
    logo: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 5,
        alignSelf: 'flex-start',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    input: {
        width: '100%',
        padding: 12,
        borderRadius: 6,
        backgroundColor: '#E9E9E9',
        marginBottom: 16,
    },
    sendCodeButton: {
        width: '100%',
        padding: 14,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 16,
        boxShadow: themes.colors.shadow
    },
    sendCodeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#D6B6F9',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        alignSelf: 'flex-end',
        paddingHorizontal: 24,
        boxShadow: themes.colors.shadow
    },
    continueText: {
        color: '#000',
        fontWeight: 'bold',
    },
    line: {
        flex:1,
        height: 2   ,
        backgroundColor: themes.colors.purpleDark
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:5,
        marginTop: 10,
        marginBottom: 20
    },
    modalStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: 50, 
        alignSelf: 'flex-start',
        backgroundColor: themes.colors.greenDark,
        padding: 12,
        borderRadius: 12,
        zIndex: 999, 
        elevation: 10,
        marginLeft:35,
        width: 270,
        height: 40
    }
});

export default styles;
