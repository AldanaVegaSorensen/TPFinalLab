import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps extends PressableProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export default function IconButton({
  icon,
  size = 24,
  color = "white",
  style,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      {...props}
      style={(state) => [
        styles.button,
        state.pressed && styles.pressed,
        typeof style === "function"
          ? style(state)
          : style,
      ]}
    >
      <Ionicons
        name={icon}
        size={size}
        color={color}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.7,
  },
});