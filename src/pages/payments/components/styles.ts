import { StyleSheet } from 'react-native';
import { themes } from '../../../global/themes';

export default StyleSheet.create({
    paymentOption: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: 16,
        color: '#222',
    },
    radioCircle: {
        height: 20, 
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
    },
});
