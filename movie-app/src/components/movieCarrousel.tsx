import { View, Text, FlatList,  } from "react-native";
import MovieCard from "@/src/components/movieCard";
import { Movie } from "@/src/types/movie";
import { carouselStyles } from "../styles/carousel.styles";
import { commonStyles } from "../styles/general";

type Props = {
  title: string;
  movies: Movie[];
};

export default function MovieCarousel({
  title,
  movies,
}: Props) {
  return (
    <View style={[carouselStyles.section]}>
      <Text style={commonStyles.title}>
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

