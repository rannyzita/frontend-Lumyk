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
    dropdownContent: {
        marginTop:3,
        backgroundColor: themes.colors.primary,
        borderRadius: 10,
        width: 150,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
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
});
