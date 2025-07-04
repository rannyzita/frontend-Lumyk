import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    components: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'relative',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        color: '#333',
        marginBottom: 20,
    },
    loadingSpinner: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        transform: [{ scale: 2 }]
    }
});

export default styles;
