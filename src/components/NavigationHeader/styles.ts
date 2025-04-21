import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    navigationHeader: {
        backgroundColor: themes.colors.primary,
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 22,
        paddingTop: 35,
    },
    backButton: {
        padding: 8,
    },
    title: {
        color: "#FFF",
        fontSize: 20,
        marginLeft: 12,
    }
});
