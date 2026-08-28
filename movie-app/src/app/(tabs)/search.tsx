import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "@/src/components/SearchBar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MovieCard from "@/src/components/movieCard";
import { useEffect, useState } from "react";
import { Genre, Movie } from "@/src/types/movie";
import { movieService } from "@/src/services/movie.service";
import { useAllMovies } from "@/src/hooks/useAllMovies";


export default function Search() {
  const {
    movies: initialMovies,
    loading,
    loadingMore,
    error,
    loadMoreMovies,
  } = useAllMovies();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      setMovies([]);
      setQuery("");
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setSearching(true);

        const data = await movieService.searchMovies(
          trimmedQuery
        );

        setMovies(data.results);
        setQuery(trimmedQuery);

      } catch (error) {
        console.error(
          "Error buscando películas:",
          error
        );
      } finally {
        setSearching(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const displayedMovies = query.trim()
    ? movies
    : initialMovies;

  if (loading) {
          return (
              <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="white" />
              </View>
          );
      }
  
      if (error) {
          return (
              <View style={styles.container}>
                  <Text style={styles.errorText}>
                    {error }
                  </Text>                  
              </View>
          );
      }

  return (
    <View style={styles.container}>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 20,
          marginLeft: 10,
        }}
      >
        <SearchBar
          placeholder="Buscar películas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        style={{
          flexGrow: 0,
          paddingHorizontal: 10,
        }}
        contentContainerStyle={{
          gap: 5,
        }}
        data={displayedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard movie={item} />
        )}
        numColumns={3}
        columnWrapperStyle={styles.row}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
      />

    </View>
  );
}

const styles =StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#4B4545"
  },

  categoryWrapper:{
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 14,
    backgroundColor: "#1B1919"
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  errorText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
})