// src/components/Input/styles.ts
import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
  boxInput: {
    backgroundColor: themes.colors.backgroundBoxes,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  button: {
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 6,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 4,
  }
});
