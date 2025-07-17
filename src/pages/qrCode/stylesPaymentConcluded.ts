import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '85%',
    boxShadow: themes.colors.shadow
  },
  iconWrapper: {
    borderRadius: 50,
    padding: 16,
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
  title: {
    color: themes.colors.purpleDark,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: themes.colors.purpleDark,
  },
  button: {
    backgroundColor: themes.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 12,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
  },
});

export default styles;
