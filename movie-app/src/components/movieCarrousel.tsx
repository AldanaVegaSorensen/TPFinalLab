// src/components/MovieCarousel.tsx

import { FlatList, Text, View, StyleSheet } from "react-native";
import MovieCard from "./movieCard";
import { Movie } from "../types/movie";

type MovieCarouselProps = {
  title: string;
  movies: Movie[];
};

export default function MovieCarousel({
  title,
  movies,
}: MovieCarouselProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <FlatList
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    paddingHorizontal: 16,
  },

  listContent: {
    paddingHorizontal: 16,
    gap: 12, // React Native reciente
  },
});