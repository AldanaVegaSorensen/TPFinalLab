import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Movie } from '../types/movie';
import MovieCardLarge from './movieCarLarge';
import { Carousel } from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get("screen")
const ITEM_SIZE = width * 0.8;
const CAROUSEL_HEIGHT = height * 0.5;

type Props = {
  title: string;
  movies: Movie[];
};


export default function CircularSlider( {title, movies}: Props){
    
  return(
      <GestureHandlerRootView>
        
        <View style={styles.container}>
          <Text style={styles.sectionTitle}>
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
                <MovieCardLarge
                  movie={item}
                  width={ITEM_SIZE-20}
                  height={CAROUSEL_HEIGHT}
                />
              </View>
            )}
          />
        </View>
      </GestureHandlerRootView>
        
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginVertical: 10
  },

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 10,
    color:"white"
  },
});