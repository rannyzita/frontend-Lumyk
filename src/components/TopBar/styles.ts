import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    topBar: {
        backgroundColor: themes.colors.primary, 
        padding: 10,
        paddingTop: themes.colors.LayoutTopBar,
    },
    topBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
    },
    searchContainer: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 40,
        gap: 0
    },
});
