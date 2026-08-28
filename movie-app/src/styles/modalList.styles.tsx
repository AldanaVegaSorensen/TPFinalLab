import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const modalStyles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginVertical: 20,
  },
  backButton: {
    alignItems: "center",
    padding: 10,
  },

  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  label:{
        color:COLORS.text,
        fontSize:18,
        fontWeight: '600'
    },
    input:{
        height: 40,
        margin: 12,
        padding: 10,
        borderWidth: 1,
    },
    textInput:{
        minHeight: 130,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#DDD",
    },
});