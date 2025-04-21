import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    boxInput: {
        backgroundColor: themes.colors.backgroundBoxes, // cor de fundo
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        marginBottom: 16,
        
        boxShadow: themes.colors.shadow
    },
    input: {
        flex: 1,
        fontFamily: 'Roboto',
        fontSize: 14,
        color: themes.colors.textPlaceHolder,
        paddingVertical: 12,
    },
    button: {
        paddingHorizontal: 4,
    },
    icon: {
        marginLeft: 10,
    },
    textInput: {
        marginLeft: 4,
        marginTop: 10,
    }
});
