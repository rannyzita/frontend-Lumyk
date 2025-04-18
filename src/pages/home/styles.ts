import { StyleSheet } from "react-native";
import { themes } from '../../global/themes'

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: themes.colors.primary, 
        padding: 10,
        paddingTop: 55,
        paddingHorizontal: 5, 
      },
      topBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 40,
      },
      searchContainer: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        paddingHorizontal: 10,
        height: 40,
      },
      filters: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 12,
      },
      authors: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        elevation: 2,
      },
});

export default styles;
