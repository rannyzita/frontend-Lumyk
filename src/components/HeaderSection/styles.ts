import { themes } from '../../global/themes';
import { StyleSheet } from 'react-native';

export const styles =  StyleSheet.create({
    headerBox: {
        backgroundColor: '#fff',
        paddingVertical: 25,
        width: '100%',
        marginBottom: 10,
        alignItems: 'center',
        boxShadow: themes.colors.shadow,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
    },
});