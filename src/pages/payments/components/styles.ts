import { StyleSheet } from 'react-native';
import { themes } from '../../../global/themes';

export default StyleSheet.create({
    paymentOption: {
        borderWidth: 2,
        borderColor: themes.colors.purpleDark,
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: 16,
        color: themes.colors.purpleDark,
    },
    radioCircle: {
        height: 20, 
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: themes.colors.purpleDark,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
    },
});
