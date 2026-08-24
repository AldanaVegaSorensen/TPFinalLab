import { View, Text, Pressable, StyleSheet,Image, ActivityIndicator, ScrollView} from "react-native";
import { useSession } from "@/src/context/AuthContext";
import { useHistory } from "@/src/hooks/useHistory";
import { useLists } from "@/src/hooks/useList";
import MovieCarousel from "@/src/components/movieCarrousel";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/colors";
import { router } from "expo-router";

export default function Profile() {
  const { signOut } = useSession();

  const {  movies, loading, reloadHistory, } = useHistory();
  const { lists, loading: listsLoading, } = useLists();

  useFocusEffect(
    useCallback(() => {
      reloadHistory();
    }, [reloadHistory])
  );


  return (
    <View style={styles.container}>

      {/*PERFIL */}
      <View style={styles.containerProfile}>
        <Image source={require("@/src/assets/images/Person_Placeholder.png")} style={styles.profilePic}/>

        <Text style={styles.texto}> Nombre de usuario </Text>
      </View>

      {/*HISTORIAL*/}
      <MovieCarousel
          title="Películas vistas"
          movies={movies}
      />

      <View style={styles.divider}/>

      {/*LISTAS*/}
      <Pressable
        onPress={() => router.push('/lists')}
        style={{
          backgroundColor: "#BA90B9",
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Mis listas
        </Text>
      </Pressable>

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

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: "#000",
      alignItems: "center",
      justifyContent: "center",
  },
  containerProfile:{
    alignItems: "center",
    marginBottom: 30,
  },
  texto:{
    color: "#fff",
    fontSize: 24,
    marginBottom: 24,
  },
  profilePic:{
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  section:{

  },
  sectionHeader:{

    marginBottom: 24,
    marginVertical: 5
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom:3,
    color: "white",
    marginLeft:10
  },
  listCard:{

  },
  listName:{

  },
  listDescription:{

  },
  divider: {
        height: 1,
        backgroundColor: "white",
        width: "100%",
        marginVertical: 10,
    },
})