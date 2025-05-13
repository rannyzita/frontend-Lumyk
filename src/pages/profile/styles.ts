import { StyleSheet } from "react-native";
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    profileContent: {
        marginTop: 20,
        width: '80%',
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
        marginBottom: -8
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
        marginBottom: 10,
    },
    iconSmall: {
        width: 30,
        height: 30,
        marginRight: 10,
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
        marginTop: 30,
    },
    deleteButton: {
        backgroundColor: themes.colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        boxShadow: themes.colors.shadow
    },
    deleteText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 10,
        paddingHorizontal: 20,
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
});

export default styles;
