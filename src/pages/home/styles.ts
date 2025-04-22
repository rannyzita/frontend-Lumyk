import { StyleSheet } from "react-native";
import { themes } from '../../global/themes'

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:240,
    marginVertical: 14,
    },
  topBar: {
      backgroundColor: themes.colors.primary, 
      padding: 10,
      paddingTop: 55,
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
      gap: 0
    },
    authors: {
      backgroundColor: '#fff',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 5,
      elevation: 2,
    },
    separator: {
      height: 3,
      backgroundColor: themes.colors.purpleDark,
      marginVertical: 1,
      alignSelf: 'center',
      width:'95%',
      marginTop: -2
    }
});

export default styles;
