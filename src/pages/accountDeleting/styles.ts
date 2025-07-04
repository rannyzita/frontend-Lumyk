import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    components: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    text: {
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
        marginBottom: 20,
    },
    progressBarBackground: {
        width: '80%',
        height: 12,
        borderRadius: 10,
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 10,
        backgroundColor: themes.colors.primary,
    },
});

export default styles;
