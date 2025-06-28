import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundLumyk,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize:25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:20,
    color: themes.colors.purpleDark,
  },
  line: {
    height: 2,
    backgroundColor: themes.colors.purpleDark,
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
  },
  sectionContainer: {
    marginTop: 10, 
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  bookTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    color: '#777',
    fontSize: 12,
  },
  status: {
    fontSize: 12,
    color: '#000',
  },
  entregue: {
    color: themes.colors.greenDark,
    fontWeight: 'bold',
  },
  priceText: {
    color: '#555',
    fontSize: 12,
  },
  
  totalMes: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    marginRight: 4,
    color: '#333',
  },
});
