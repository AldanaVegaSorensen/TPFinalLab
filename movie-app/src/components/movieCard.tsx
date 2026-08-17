import { Pressable, Image } from "react-native";
import { router } from "expo-router";

type Props = {
  movie: any;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Pressable onPress={()=> router.push(`/movie/${movie.id}`)}>
      <Image
        source={{
          uri:
            "https://image.tmdb.org/t/p/w500" +
            movie.poster_path
        }}
        style={{
          width: 120,
          height: 180,
          borderRadius: 16
        }}
        resizeMode="cover"
      />
    </Pressable>
  );
}
