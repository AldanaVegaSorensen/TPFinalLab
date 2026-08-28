import { ActivityIndicator, ScrollView, Text, View, StyleSheet, StatusBar, Image, Pressable } from "react-native";
import MovieCarousel from "@/src/components/movieCarrousel";
import { useMovies } from "@/src/hooks/useMovies";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CircularSlider from "@/src/components/circularSlider";
import { router } from "expo-router";
import { COLORS } from '@/src/constants/colors';
import IconButton from "@/src/components/IconButton";


export default function Home() {
  const popular = useMovies("popular");
  const topRated = useMovies("top_rated");
  const upcoming = useMovies("upcoming");
  const nowPlaying = useMovies("now_playing")

  if (
  popular.loading ||
  topRated.loading ||
  upcoming.loading ||
  nowPlaying.loading
) {
    return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            );
  }

  if (
  popular.error ||
  topRated.error ||
  upcoming.error ||
  nowPlaying.error
) {
    return (
      <Text>
        {popular.error ||
          topRated.error ||
          upcoming.error ||
          nowPlaying.error}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Image
            source={require("@/src/assets/images/logo1.png")}
            style={styles.logo}
          />

          <IconButton
            icon="search"
            onPress={() => router.push("/(tabs)/search")}
          />
        </View>
      </SafeAreaView>

      <ScrollView>
          <CircularSlider 
            title="Películas populares"
            movies={popular.movies} 
          />

          <MovieCarousel
            title="Mejor valoradas"
            movies={topRated.movies}
          />

          <MovieCarousel
            title="Próximamente"
            movies={upcoming.movies}
          />

          <MovieCarousel
            title="En cartelera"
            movies={nowPlaying.movies}
          />
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10
  },
  logo: {
    width: 45,
    height: 45,
    marginLeft: 12
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  searchButton: {
    padding: 8,
  },
  
    loadingContainer: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
});