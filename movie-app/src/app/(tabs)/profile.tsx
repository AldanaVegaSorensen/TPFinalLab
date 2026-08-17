import { View, Text, Pressable } from "react-native";
import { useSession } from "@/src/context/AuthContext";

export default function Profile() {
  const { signOut } = useSession();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 24,
          marginBottom: 24,
        }}
      >
        Mi perfil
      </Text>

      <Pressable
        onPress={signOut}
        style={{
          backgroundColor: "#BA90B9",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Cerrar sesión
        </Text>
      </Pressable>
    </View>
  );
}