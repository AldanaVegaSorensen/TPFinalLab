import { ActivityIndicator, ScrollView, Text, View, StatusBar, Image, } from "react-native";
import MovieCarousel from "@/src/components/movieCarrousel";
import { useMovies } from "@/src/hooks/useMovies";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularSlider from "@/src/components/circularSlider";
import { router } from "expo-router";
import IconButton from "@/src/components/IconButton";
import { commonStyles } from "@/src/styles/general";


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
                <View style={commonStyles.loadingContainer}>
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
    <View style={commonStyles.darkContainer}>
      <SafeAreaView>
        <StatusBar barStyle="light-content" />
        <View style={commonStyles.headerHome}>
          <Image
            source={require("@/src/assets/images/logo1.png")}
            style={commonStyles.logo}
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

