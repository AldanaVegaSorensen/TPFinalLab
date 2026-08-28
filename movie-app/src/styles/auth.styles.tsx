import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const authStyles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 36,
  },
  headerImage:{
    width: 80,
    height: 80,
    alignSelf:'center',
    marginLeft:15,
  },
  form: {
    marginBottom: 24,
    flex: 1,
  }, 
  input:{
    marginBottom:16,
  },
  formAction:{
    marginVertical: 24
  },
  formfooter:{
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 0.15
  },
});