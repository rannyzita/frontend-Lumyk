import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    boxTop: {
        alignItems:'center',
        justifyContent:'center'
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
    boxBottom: {

    }
});

export default styles;
