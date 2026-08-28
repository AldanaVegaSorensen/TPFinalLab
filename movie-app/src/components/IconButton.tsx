import React from "react";
import { Pressable, PressableProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { commonStyles } from "../styles/general";

interface IconButtonProps extends PressableProps {
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

export default function IconButton({
  icon,
  size = 30,
  color = "white",
  style,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      {...props}
      style={(state) => [
        styles.button,
        state.pressed && commonStyles.pressed,
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
});