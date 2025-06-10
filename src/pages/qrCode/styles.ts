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
        alignItems: 'center',
        elevation: 6,
        width: '100%',
        height: 400
    },
    qrText: {
        textAlign: 'center',
        marginVertical: 12,
        fontSize: 14,
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '100%',
    },
    codeText: {
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
});

export default styles;
