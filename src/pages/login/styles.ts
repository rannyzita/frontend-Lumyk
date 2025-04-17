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
    textBottom: {

    },
    textBottomClickHere: {
        color: themes.colors.link,
        fontWeight: 'regular',
        textDecorationLine: 'underline'
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:20
    },
    line: {
        flex:1,
        height: 2   ,
        backgroundColor: themes.colors.purpleDark
    },
    separatorText: {
        color:themes.colors.purpleDark,    
    },
    buttonLogin: {
        alignItems:'center',
        justifyContent: 'center'
    },
    socialButtonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    socialButtonFacebook: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.facebook,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    socialText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    }
});

export default styles;
