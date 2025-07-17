import { StyleSheet } from "react-native";
import { themes } from "../../../../global/themes";

export const styles = StyleSheet.create({
    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: themes.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCheckbox: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
    },
});
