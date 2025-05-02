import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    modalStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: 50, 
        alignSelf: 'flex-start',
        backgroundColor: themes.colors.greenDark,
        padding: 12,
        borderRadius: 12,
        zIndex: 999, 
        elevation: 10,
        marginLeft:35,
        width: 270,
        height: 45
    }
});
