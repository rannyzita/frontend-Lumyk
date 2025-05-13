import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    
},
modalContainer: {
    backgroundColor: '#FFF',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: 40
},
iconWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
},
title: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.colors.purpleDark,
    textAlign: 'center',
    marginBottom: 12,
},
description: {
    fontSize: 12,
    color: '#5A2D82',
    marginBottom: 24,
},
buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'flex-end', 
    width: '100%',
},
cancelButton: {
    backgroundColor: '#E6E6E6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100, 
    boxShadow: themes.colors.shadow
},
cancelText: {
    color: '#333',
    fontWeight: '600',
    textAlign: 'center'
},
confirmButton: {
    backgroundColor: themes.colors.red, 
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100, 
    boxShadow: themes.colors.shadow
},
confirmText: {
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center'
},
});
