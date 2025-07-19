import { Platform, StatusBar } from 'react-native';

export const themes = {
    colors: {
        primary: '#A662FF',
        backgroundBoxes: '#D9D9D9',
        greenDark: '#13A018',
        greenLight: '#0DED14',
        red: '#D32F2F',
        textFrete: '#F19000',
        textPlaceHolder: '#5B5B5B',
        link: '#0035A6',
        purpleDark: '#672BB6',
        facebook: '#1877F2',
        textInput: '#969696',
        backgroundLumyk: '#FAFAFA',
        shadow: "0 5px 10px  rgba(0, 0, 0, 0.14)",
        LayoutTopBar: Platform.OS === 'android' ? StatusBar.currentHeight : 10
    }
};