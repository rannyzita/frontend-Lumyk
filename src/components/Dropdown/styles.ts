import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const stylesDropDown = StyleSheet.create({
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
    dropdownContent: {
        marginTop:3,
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        width: 150,
        boxShadow: themes.colors.shadow
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff33'
    },
    dropdownItemText: {
        color: '#fff',
        fontSize: 12,
    },
    scrollableList: {
        maxHeight: 200, 
    },
    placeholderText: {
        fontStyle: 'italic',
        padding: 8,
        color: '#888', 
    },
});
