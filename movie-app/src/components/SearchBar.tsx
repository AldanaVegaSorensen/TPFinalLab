import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar = ({
  placeholder,
  value,
  onChangeText,
}: Props) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color="#888"
        style={styles.icon}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.textSecondary}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="always"
        autoCorrect={false}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
  },

  icon: {
    marginRight: 8,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    color: COLORS.text
  },
});

