import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: themes.colors.backgroundLumyk,
},
scrollContainer: {
    padding: 16,
},
authorCard: {
    backgroundColor: "#fff",
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 12,
},
authorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 14
},
authorInfo: {
    flex: 1,
    paddingLeft:14
},
authorName: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
},
biographyTitle: {
    fontWeight: 'bold',
    marginBottom: 2,
},
authorBio: {
    fontSize: 12,
},
sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: themes.colors.purpleDark,
    marginBottom: 10,
    marginTop: 8,
},
bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
},
bookImage: {
    width: 80,
    height: 120,
    borderRadius: 6,
    marginRight: 12,
},
bookInfo: {
    flex: 1,
},
bookTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
},
bookFormat: {
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
},
bookPrice: {
    fontSize: 13,
    marginBottom: 2,
},
bookFormats: {
    fontSize: 12,
},
button: {
    backgroundColor: themes.colors.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
},
buttonText: {
    color: "#fff",  
    fontSize: 12,
},
emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
},
});

export default styles;
