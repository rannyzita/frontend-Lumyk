import { StyleSheet } from "react-native";
import { themes } from "../../../../global/themes";

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
        position:'absolute', 
        top: 35, 
        zIndex: 10, 
        marginTop:3,
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        width: 150,
        boxShadow: themes.colors.shadow
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff33'
    },
    dropdownItemText: {
        color: '#fff',
        fontSize: 10,
        flex: 1, 
        flexWrap: 'wrap',
        marginRight: 10, 
    },
    scrollableList: {
        maxHeight: 200, 
    },
    placeholderText: {
        fontStyle: 'italic',
        padding: 8,
        color: '#888', 
    },
    searchWrapper: {
        backgroundColor: themes.colors.primary,
        padding: 8,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});
