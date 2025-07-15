import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk,
    },
    scroll: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    AssinaturaCard: {
        backgroundColor: '#fff',
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
        backgroundColor: '#FFF',
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    subscriptionImage: {
        width: '95%',
        height: 150,
        marginLeft: 10
    },
});
