import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import { useSession } from "@/src/context/AuthContext";
import { useHistory } from "@/src/hooks/useHistory";
import MovieCarousel from "@/src/components/movieCarrousel";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { router } from "expo-router";

interface TokenPayload {
    userId: number;
}
export default function Profile() {
  const { signOut, user } = useSession();

  const { movies, loading, error, reloadHistory, } = useHistory();


  useFocusEffect(
    useCallback(() => {
        reloadHistory();
    }, [reloadHistory])
);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* PERFIL */}
      <View style={styles.containerProfile}>
        <Image
          source={require("@/src/assets/images/Person_Placeholder.png")}
          style={styles.profilePic}
        />

        <Text style={styles.texto}>
          {user?.name ?? "Usuario"}
        </Text>
      </View>

      {/* HISTORIAL */}
      <View style={styles.historyContainer}>
        <MovieCarousel
          title="Películas vistas"
          movies={movies}
        />
      </View>

      <View style={styles.divider} />

      {/* LISTAS */}
      <Pressable
        onPress={() => router.push("/lists")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Mis listas
        </Text>
      </Pressable>

      {/* CERRAR SESIÓN */}
      <Pressable
        onPress={signOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          Cerrar sesión
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  containerProfile: {
    alignItems: "center",
    marginBottom: 30,
  },

  profilePic: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },

  texto: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 24,
  },

  historyContainer: {
    width: "100%",
  },

  divider: {
    height: 1,
    backgroundColor: "white",
    width: "100%",
    marginVertical: 20,
  },

  button: {
    backgroundColor: "#BA90B9",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  errorText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});