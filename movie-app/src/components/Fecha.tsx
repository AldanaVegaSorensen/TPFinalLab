import { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface FechaProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function Fecha({ value, onChange }: FechaProps) {
  const [showDate, setShowDate] = useState(false);

  return (
    <View>
      <Pressable
        style={styles.actionButton}
        onPress={() => setShowDate(true)}
      >
        <Ionicons
          name="calendar"
          size={28}
          color="white"
        />

        <Text style={styles.actionText}>
          {value.toLocaleDateString("es-AR")}
        </Text>
      </Pressable>

      {showDate && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, selectedDate) => {
            setShowDate(false);

            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 15,
  },

  actionText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "600",
  },
});