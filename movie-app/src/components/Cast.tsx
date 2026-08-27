import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

import { CastMember } from "../types/movie";
import PersonCard from "./PersonCard";

type CastProps = {
  cast?: CastMember[];
};

export default function Cast({ cast }: CastProps) {
  const topCast = cast?.slice(0, 10);

  if (!topCast?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Top Cast
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {topCast.map((person) => (
          <PersonCard
            key={person.id}
            name={person.name}
            role={person.character}
            image={person.profile_path}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },

  title: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 20,
  },

  content: {
    paddingHorizontal: 15,
  },
});