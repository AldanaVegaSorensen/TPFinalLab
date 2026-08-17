import { Pressable, Image } from "react-native";
import { Dimensions } from "react-native";
import { router } from "expo-router";

const { width:widthScreen, height:heightScreen } = Dimensions.get("screen");

type Props = {
  movie: any;
  width?: number;
  height?:number;
};

export default function MovieCardLarge({ movie, width = widthScreen * 0.7,
  height = heightScreen * 0.4 }: Props) {
  return (
    <Pressable onPress={()=> router.push(`/movie/${movie.id}`)}>
      <Image
        source={{
          uri:
            "https://image.tmdb.org/t/p/w500" +
            movie.poster_path
        }}
        style={{
          width: width,
          height: height,
          borderRadius: 24,
          
        }}
      />
    </Pressable>
  );
}