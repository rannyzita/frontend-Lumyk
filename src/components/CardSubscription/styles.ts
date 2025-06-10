import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export default StyleSheet.create({
card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    width: '70%',
    boxShadow: themes.colors.shadow
},
cardPlanos: {
    backgroundColor: themes.colors.primary,
    width: '117%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8, 
    height: 28,
    marginLeft: -20,
    marginRight: -20,
},
planTitle: {
    fontSize: 12,
    color: '#fff',
},
price: {
    fontSize: 16,
    marginBottom: 10,
},
benefitsContainer: {
    marginBottom: 15,
},
benefitsTitle: {
    fontSize: 12,
    color: '#fff'
},
priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
},
benefitsRow: {
    flexDirection: 'row',
    backgroundColor: themes.colors.primary,
    width: 120, 
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 20,
},
button: {
    backgroundColor: themes.colors.primary,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
},
buttonText: {
    color: '#FFF',
    fontSize: 14,
},
benefitText: {
    fontSize: 14,
    marginBottom: 5,
},
});
