import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        alignSelf: 'center', 

        boxShadow: "0 5px 10px  rgba(0, 0, 0, 0.35)"
    },
    textButton: {
        color: '#fff',
        fontSize: 14,
    },
});
