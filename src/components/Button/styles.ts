import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        alignSelf: 'center', 

        boxShadow: themes.colors.shadow
    },
    textButton: {
        color: '#fff',
        fontSize: 14,
    },
});
