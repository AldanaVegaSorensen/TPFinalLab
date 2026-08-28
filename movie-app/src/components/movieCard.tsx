import { Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Movie } from "@/src/types/movie";

type Props = {
  movie: Movie;
  width?: number;
  height?: number;
};

export default function MovieCard({
  movie,
  width = 120,
  height = 180,
}: Props) {
  return (
    <Pressable onPress={() => router.push(`/movie/${movie.id}`)}>
      <Image
        source={
          movie.poster_path
            ? {
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }
            : require("../assets/images/no poster.png")
        }
        style={[
          styles.image,
          {
            width,
            height,
          },
        ]}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 16,
  },
});