import React from "react";
import { Pressable, Text, StyleSheet, PressableProps, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface ActionButtonProps extends PressableProps {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function ActionButton({
  title,
  icon,
  style,
  ...props
}: ActionButtonProps) {
  return (
    <Pressable
      {...props}
      style={styles.button}
    >
      <Ionicons
        name={icon}
        size={28}
        color="white"
      />

      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    gap: 8,
  },
  text: {
    color: COLORS.text,
    fontSize: 18,
  fontWeight: "600",
  }
});