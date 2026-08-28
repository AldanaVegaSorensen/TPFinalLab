import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  PressableProps,
} from "react-native";

interface PrimaryButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  loading = false,
  disabled,
  style,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={(state) => [
        styles.button,
        isDisabled && styles.disabled,
        state.pressed && !isDisabled && styles.pressed,
        typeof style === "function"
          ? style(state)
          : style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#4CD5CA", 
    borderColor: "#36C1B5",
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});