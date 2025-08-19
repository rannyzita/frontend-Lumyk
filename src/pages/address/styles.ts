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
    color: themes.colors.purpleDark,
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
    color: themes.colors.purpleDark
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginTop: 12
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
    boxShadow: themes.colors.shadow,
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
    borderRadius: 999, 
    borderWidth: 2,
    borderColor: themes.colors.purpleDark,
    marginLeft: 12,
  },
  checkboxSelected: {
    borderColor: themes.colors.purpleDark,
    backgroundColor: themes.colors.purpleDark
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
      marginTop: 8,
  },
  enderecoText: {
    fontSize: 14,
    color: themes.colors.purpleDark,
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 5,
    marginRight: 12,
    textDecorationLine: 'underline',
  },
  
  dropdownButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: themes.colors.purpleDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  
  dropdownText: {
    color: themes.colors.purpleDark,
    fontWeight: '500',
  },
});

export default styles;
