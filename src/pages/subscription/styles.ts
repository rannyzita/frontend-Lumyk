import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export default StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundLumyk,
},
scroll: {
    alignItems: 'center',
    paddingVertical: 30,
},
AssinaturaCard: {
    backgroundColor: '#fff',
    width:'100%',
    alignItems: 'center',
    paddingVertical: 30,
},
title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: themes.colors.purpleDark,
},
svgContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
},
subscriptionImage: {
    width: '95%',
    height: 150,
    marginLeft: 10
},
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
benefitText: {
    fontSize: 14,
    marginBottom: 5,
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
});
