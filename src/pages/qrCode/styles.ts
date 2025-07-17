import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.backgroundLumyk,
    },
    qrContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
        height: 100
    },
    qrCode:{
        marginTop: 40
    },
    qrBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        elevation: 6,
        width: '100%',
        height: 420
    },
    qrText: {
        color: themes.colors.purpleDark,
        textAlign: 'center',
        marginVertical: 12,
        fontSize: 14,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#672BB6',
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignSelf: 'stretch', 
    },
    codeText: {
        color: themes.colors.purpleDark,
        flex: 1,
        fontSize: 13,
        marginRight: 8,
    },
    confirmButton: {
        backgroundColor: themes.colors.primary,
        paddingVertical: 12,
        borderRadius: 10,
        marginTop: 60,
        width: '100%',
        alignItems: 'center',
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    totalText: {
        color: themes.colors.purpleDark,
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});

export default styles;
