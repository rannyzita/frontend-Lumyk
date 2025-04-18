import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    dropdownButton: {
        backgroundColor: themes.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal:20,
        paddingVertical: 10,
        borderRadius: 10,
        width:'95%',
    },
    buttonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    dropdownButtonText: {
        color: '#fff',
        fontSize: 12,
        marginRight: 8,
    },
});
