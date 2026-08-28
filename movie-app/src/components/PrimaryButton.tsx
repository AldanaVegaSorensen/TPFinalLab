import React from "react";
import { Pressable, Text, ActivityIndicator, PressableProps, } from "react-native";
import { commonStyles } from "../styles/general";

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
        commonStyles.button,
        isDisabled && commonStyles.disabled,
        state.pressed && !isDisabled && commonStyles.pressed,
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
        <Text style={commonStyles.text}>{title}</Text>
      )}
    </Pressable>
  );
}
