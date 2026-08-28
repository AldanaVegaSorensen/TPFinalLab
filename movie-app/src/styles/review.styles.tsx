import { StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

export const styles = StyleSheet.create({
    container: {
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  review: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    color: COLORS.text,
    fontWeight: "600",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  star: {
    color: COLORS.accent,
    fontSize: 16,
  },

  ratingText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  comment: {
    color: COLORS.text,
    marginTop: 8,
    lineHeight: 20,
  },

  date: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 8,
  },
})