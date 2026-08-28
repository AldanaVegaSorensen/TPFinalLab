import { View, Text, Dimensions } from 'react-native'
import { Movie } from '../types/movie';
import { Carousel } from "react-native-reanimated-carousel";
import MovieCard from './movieCard';
import { styles } from '../styles/circularSlider.styles';
import { commonStyles } from '../styles/general';


const { width, height } = Dimensions.get("screen")
const ITEM_SIZE = width * 0.8;
const CAROUSEL_HEIGHT = height * 0.5;

type Props = {
  title: string;
  movies: Movie[];
};


export default function CircularSlider( {title, movies}: Props){
  return(
      <View style={styles.container}>
          <Text style={commonStyles.title}>
            {title}
          </Text>
          <Carousel
            style={{
              width: width,
              height: CAROUSEL_HEIGHT,
            }}
            itemSize={ITEM_SIZE}
            data={movies}
            loop
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <MovieCard
                  movie={item}
                  width={ITEM_SIZE-20}
                  height={CAROUSEL_HEIGHT}
                />
              </View>
            )}
          />
        </View>
        
    )
}


