import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundLumyk,
    paddingTop: 60,
    // paddingHorizontal: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themes.colors.purpleDark,
    textAlign: 'center',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: '95%',
    maxWidth: 350,
    alignSelf: 'center',
    boxShadow: themes.colors.shadow,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#9D4EDD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#9D4EDD',
  },
  checkboxTick: {
    width: 10,
    height: 6,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff',
    transform: [{ rotate: '-45deg' }],
  },
  leftColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 130,
    marginBottom: 10,
    marginTop: 10,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  qtdButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  qtdText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 28,
    textAlign: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  type: {
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  inStock: {
    fontSize: 13,
    color: 'green',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  totalBox: {
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    width: '100%', 
    boxShadow: themes.colors.shadow,
  },
  
  totalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  semFrete: {
    color: 'orange',
    marginBottom: 8,
    fontSize: 12,
  },
  checkoutButton: {
    backgroundColor: '#9D4EDD',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loading: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: 75 }],
    zIndex: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: themes.colors.purpleDark,
    textAlign: 'center',
    marginTop: -60,
  },
  // checkboxContainerItem: {
  //   marginLeft: 10,
  //   marginRight: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // trashButtonItem: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 12,
  },
  
  trashButtonItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 6,
    zIndex: 10,
  },
  
  checkboxContainerItem: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default styles;
