import { StyleSheet } from "react-native";
import {themes} from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        marginTop:60
    },
    title: {
        fontSize: 36,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginTop: 10, 
        marginBottom: 10,
    },
    buttonLogin: {
        alignItems:'center',
        justifyContent: 'center',
    },
    socialButtonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 320,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        boxShadow: themes.colors.shadow
    },
    socialButtonFacebook: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.facebook,
        width: 320,
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        boxShadow: themes.colors.shadow
    },    
    socialText: {
        color: '#fff',
        fontSize: 14,
    },
    socialTextWrapper: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 14, 
    },
    textWrapper: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:5,
        marginTop: 14
    },
    line: {
        flex:1,
        height: 2   ,
        backgroundColor: themes.colors.purpleDark
    },
    separatorText: {
        color:themes.colors.purpleDark,    
    },
    label: {
        fontFamily: 'Roboto',
        fontSize:14
    },
    errorText: {
        color: themes.colors.red,                
        fontSize: 14,                
        marginTop: 0,                
        fontWeight: 'bold',    
        minHeight: 18,               
    },
    textBottomClickHere: {
        color: themes.colors.link,
        fontWeight: 'regular',
        textDecorationLine: 'underline',
        marginTop: 7
    },
});

export default styles;
