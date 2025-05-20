import { StyleSheet } from "react-native";
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    profileContent: {
        marginTop: 20,
        width: '85%',
        alignItems: 'center',
    },
    profileIcon: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical:5,
    },
    line: {
        flex:1,
        height: 2   ,
        backgroundColor: themes.colors.purpleDark
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: -6
    },
    profileName: {
        fontSize: 22,
        color: themes.colors.purpleDark,
        marginRight: 8,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 3,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap:14
    },
    iconSmall: {
        width: 30,
        height: 30,
        marginRight: 50,
        marginBottom: 7
    },
    addressTitle: {
        fontSize: 22,
        color: themes.colors.purpleDark,
        alignSelf: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
        marginTop: 60,
    },
    deleteButton: {
        backgroundColor: themes.colors.red,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        boxShadow: themes.colors.shadow
    },
    deleteText: {
        color: '#FFFFFF',
    },
    logoutButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        boxShadow: themes.colors.shadow

    },
    logoutText: {
        color: themes.colors.textPlaceHolder,
    },
    section: {
        marginBottom: -20,
        width: '100%',
    },
    keyboardView: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
        padding: 16,
        justifyContent: 'flex-start'
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default styles;
