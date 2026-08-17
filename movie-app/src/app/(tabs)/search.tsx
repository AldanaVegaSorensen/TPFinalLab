import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import SearchBar from "@/src/components/SearchBar";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MovieCard from "@/src/components/movieCard";
import { useEffect, useState } from "react";
import { Movie } from "@/src/types/movie";
import { movieService } from "@/src/services/movie.service";
import { useAllMovies } from "@/src/hooks/useAllMovies";
import { FilterItem } from "@/src/components/filterItem";


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

  const displayedMovies = query.trim() ? movies : initialMovies;

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterItem title="Categoria" />
          <FilterItem title="Región" />
          <FilterItem title="Categoria" />
          <FilterItem title="Región" />
        </ScrollView>

        <TouchableOpacity activeOpacity={0.8} style={{ padding: 10 }}>
          <Ionicons
            name="filter"
            size={24}
            color="white"
          />
        </TouchableOpacity>
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

        // Cargar más cuando llegamos al final
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}

        // Loading al final de la lista
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
})