import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themes.colors.backgroundLumyk,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: themes.colors.purpleDark,
    },
    separator: {
        height: 2,
        backgroundColor: themes.colors.purpleDark,
        width: '87%',
        marginVertical: 10,
    },
    scrollContainer: {
        padding: 19,
        paddingBottom: 30,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 15,
        width: 335,
        boxShadow: themes.colors.shadow
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    authorName: {
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
        marginLeft:10
    },
    buttonContainer: {
        backgroundColor: themes.colors.primary,
        paddingVertical: 9,
        paddingHorizontal: 17,
        marginLeft:9,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default styles;
