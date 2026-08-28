import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const commonStyles = StyleSheet.create({
  // Contenedores
  container: {
    flex: 1,
  },

  darkContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // Loading
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  // Errores
  errorText: {
    color: COLORS.text,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  // Textos
  title: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "700",
    marginBottom: 6,
    marginLeft: 12
  },

  centeredTitle: {
    color: COLORS.text,
    fontSize: 27,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },

  // Header
    headerHome: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    header:{
        height: 60,
        backgroundColor:COLORS.primary,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:20,
        position:'relative',
        marginBottom:7
    },

  // Botones
  iconButton: {
    padding: 4,
  },

  // Perfil
  containerProfile: {
    alignItems: "center",
    marginVertical: 30,
  },

  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  profileText: {
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 24,
  },

  //INPUTS
  inputLabel:{
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  inputText:{
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  //BOTON
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:COLORS.primary, 
  },
  text: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },

  //LOGO E ICONOS
  logo: {
    width: 45,
    height: 45,
    marginLeft: 12
  },

  close:{
        position:'absolute',
        right: 15,
        padding:6,
    },

  //DIVIDER
  divider: {
    height: 1,
    backgroundColor: COLORS.text,
    width: "100%",
  },
});