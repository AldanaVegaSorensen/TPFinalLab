import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SearchBar } from "@/src/components/SearchBar";
import MovieCard from "@/src/components/movieCard";
import { useEffect, useState } from "react";
import { Movie } from "@/src/types/movie";
import { movieService } from "@/src/services/movie.service";
import { useAllMovies } from "@/src/hooks/useAllMovies";
import { commonStyles } from "@/src/styles/general";
import { searchStyles } from "@/src/styles/search.styles";


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
              <View style={commonStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="white" />
              </View>
          );
      }
  
      if (error) {
          return (
              <View style={commonStyles.darkContainer}>
                  <Text style={commonStyles.errorText}>
                    {error }
                  </Text>                  
              </View>
          );
      }

  return (
    <View style={commonStyles.darkContainer}>

      <View
        style={searchStyles.barContainer}
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
        columnWrapperStyle={searchStyles.row}
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
