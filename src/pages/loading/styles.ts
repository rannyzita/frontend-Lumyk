import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    components: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent:'center',
        flex:1,
        marginTop:-70
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20
    },
    loadingContainer: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
    }
});

export default styles;
