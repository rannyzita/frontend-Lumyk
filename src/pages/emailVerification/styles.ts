import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 24,
    lineHeight: 22,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  linkText: {
    marginTop: 16,
    color: '#007AFF',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
