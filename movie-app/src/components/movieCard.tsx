import { Pressable, Image } from "react-native";

type Props = {
  movie: any;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Pressable>
      <Image
        source={{
          uri:
            "https://image.tmdb.org/t/p/w500" +
            movie.poster_path
        }}
        style={{
          width: 120,
          height: 180
        }}
      />
    </Pressable>
  );
}
