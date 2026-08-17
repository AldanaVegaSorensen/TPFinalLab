import { ActivityIndicator, ScrollView, Text, View, StyleSheet, StatusBar, Image, Pressable } from "react-native";
import MovieCarousel from "@/src/components/movieCarrousel";
import { useMovies } from "@/src/hooks/useMovies";
import { genres } from "@/src/constants/genres"
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CircularSlider from "@/src/components/circularSlider";


export default function Home() {
  const popular = useMovies("popular");
  const topRated = useMovies("top_rated");
  const upcoming = useMovies("upcoming");
  const nowPlaying = useMovies("now_playing")

  if (
    popular.loading ||
    topRated.loading ||
    upcoming.loading
  ) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (
    popular.error ||
    topRated.error ||
    upcoming.error
  ) {
    return (
      <Text>
        {popular.error ||
          topRated.error ||
          upcoming.error}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <Pressable>
            <Ionicons
              name="menu"
              size={24}
              color="white"
            />
          </Pressable>

          <Image
            source={require("@/src/assets/images/logo1.png")}
            style={styles.logo}
          />

          <Pressable>
            <Ionicons
              name="search"
              size={24}
              color="white"
            />
          </Pressable>
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
    backgroundColor: '#414141',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  logo: {
    width: 48,
    height: 40,
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
});