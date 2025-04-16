import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        alignSelf: 'center', 

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 10, 
    },
    textButton: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
