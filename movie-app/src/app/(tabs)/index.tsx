import { useEffect, useState } from "react";
import { ScrollView, ActivityIndicator, View } from "react-native";

import MovieCarousel from "@/src/components/movieCarrousel";
import { movieService } from "@/src/services/movie.service";
import { HomeSection } from "@/src/types/home";

export default function Home() {

  const [sections, setSections] = useState<HomeSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadHome() {

      try {

        const { data } = await movieService.getHome();

        setSections(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    }

    loadHome();

  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      {sections.map((section) => (
        <MovieCarousel
          key={`${section.type}-${section.title}`}
          title={section.title}
          movies={section.movies}
        />
      ))}
    </ScrollView>
  );
}