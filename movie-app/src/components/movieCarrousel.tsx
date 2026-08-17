import { View, Text, FlatList, StyleSheet } from "react-native";
import MovieCard from "@/src/components/movieCard";
import { Movie } from "@/src/types/movie";
import MovieCardLarge from "./movieCarLarge";

type Props = {
  title: string;
  movies: Movie[];
  variant?: "default" | "large";
};

export default function MovieCarousel({
  title,
  movies,
  variant = "default"
}: Props) {
  return (
    <View style={[styles.section]}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <FlatList
        style = {{flexGrow:0, paddingHorizontal:8 }}
        contentContainerStyle={{gap:5,}}
        data={movies}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (<MovieCard movie={item} />)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    marginVertical: 5
  },
  sectionLarge:{
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom:3,
    color: "white",
    marginLeft:10
  },

  listContent: {
    paddingHorizontal: 16,
  },
  listContentLarge: {
    paddingHorizontal: 5,
  },
});