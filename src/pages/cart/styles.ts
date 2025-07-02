import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundLumyk,
    paddingTop: 60,
    paddingHorizontal: 12,
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
  padding: 8,
  marginBottom: 16,

  width: '95%',        // 90% da largura da tela
  maxWidth: 350,       // limita para no máximo 350 pixels
  alignSelf: 'center',

  flexDirection: 'row',
  position: 'relative',
  boxShadow: themes.colors.shadow,
  alignItems: 'flex-start', // alinha os itens no topo
  },

  image: {
    width: 100,
    height: 130,
    marginBottom: 10, // espaço entre imagem e botões de quantidade
    marginTop: 10, // desce a imagem um pouco
  },

  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  title: {
    marginTop: 10,
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

  stock: {
    fontSize: 13,
    color: 'green',
    marginBottom: 4,
  },

  price: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
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
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  qtdText: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 28,        // largura fixa, suficiente para até 2 dígitos (ex: "99")
    textAlign: 'center',
  },

  trashButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    zIndex: 10,
  },
  leftColumn: {
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
  },
  separator: {
    height: 2,
    backgroundColor: themes.colors.purpleDark,
    width: '95%',
    marginVertical: 10,
    marginBottom:10
},
  subtotalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  subtotalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inStock: {
    color: 'green',
    marginBottom: 4,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  totalBox: {
    position: 'absolute',
    bottom: -15,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 16,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 40,
    marginHorizontal: -20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    margin: 16,
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
  checkboxContainer: {
    position: 'absolute',
    top: 80,
    right: 10,
  },
  
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#9D4EDD',  // roxo forte da sua paleta
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
  
});

export default styles;
