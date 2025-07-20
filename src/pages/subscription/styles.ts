import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk,
        paddingTop: 40,
    },
    scroll: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    AssinaturaCard: {
        backgroundColor: 'white',
        width:'100%',
        alignItems: 'center',
        paddingVertical: 30,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
    },
    svgContainer: {
        backgroundColor: 'white',
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: themes.colors.shadow,
    },
    subscriptionImage: {
        width: '95%',
        height: 150,
        marginLeft: 10
    },
});
