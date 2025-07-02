import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: themes.colors.backgroundLumyk,
  },
  adicionarTexto: {
    color: '#A45EFF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -15,
    textDecorationLine: 'underline',
  },
  enderecoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  enderecoText: {
    fontSize: 14,
    color: '#333',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    marginRight: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    minHeight: 300,
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropdownButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdownText: {
    color: '#333',
  },
  dropdownModalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  dropdownModalContent: {
    position: 'absolute',
    backgroundColor: '#fff',
    maxHeight: 250,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownSearchInput: {
    fontSize: 14,
    color: themes.colors.textInput,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingRight: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 999, // circular
    borderWidth: 2,
    borderColor: '#ccc',
    marginLeft: 12,
  },
  checkboxSelected: {
    borderColor: themes.colors.primary,
    backgroundColor: themes.colors.primary
  },
  checkboxSelectedInner: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: themes.colors.primary,
  },
  salvarButton: {
    backgroundColor: themes.colors.primary,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  salvarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    flex:1,
    height: 2,
    backgroundColor: themes.colors.purpleDark,
  },
  separatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical:5,
      marginTop: 10,
      marginBottom: 20,
  },
});

export default styles;
