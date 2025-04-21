import { StyleSheet } from "react-native";
import { themes } from '../../global/themes'

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
    },
    navigationHeader: {
        backgroundColor: themes.colors.primary,
        width: '100%',
        height: 100
    }
});

export default styles;
