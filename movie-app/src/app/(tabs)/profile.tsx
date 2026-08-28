import { View, Text, Image, ActivityIndicator,} from "react-native";
import { useSession } from "@/src/context/AuthContext";
import { useHistory } from "@/src/hooks/useHistory";
import MovieCarousel from "@/src/components/movieCarrousel";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { router } from "expo-router";
import PrimaryButton from "@/src/components/PrimaryButton";
import { commonStyles } from "@/src/styles/general";
import { styles } from "@/src/styles/profile.styles";

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
      <View style={commonStyles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.loadingContainer}>
        <Text style={commonStyles.errorText}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.darkContainer}>

      {/* PERFIL */}
      <View style={commonStyles.containerProfile}>
        <Image
          source={require("@/src/assets/images/Person_Placeholder.png")}
          style={commonStyles.profilePic}
        />

        <Text style={commonStyles.text}>
          {user?.name ?? "Usuario"}
        </Text>
      </View>

      {/* HISTORIAL */}
      <View style={styles.historyContainer}>
        <MovieCarousel
          title="Películas vistas"
          movies={movies}
        />

        <View style={commonStyles.divider} />
      </View>

      

    <View style={styles.buttonsContainer}>
      {/* LISTAS */}
      <PrimaryButton
        title="Mis listas"
        onPress={() => router.push("/lists")}
      />

      {/* CERRAR SESIÓN */}
      <PrimaryButton
        title="Cerrar sesión"
        onPress={signOut}
      />

    </View>
      

    </View>
  );
}

