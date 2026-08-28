import { View, Text, ScrollView, StyleSheet, } from "react-native";

import { CrewMember } from "../types/movie";
import PersonCard from "./PersonCard";

type CrewProps = {
  crew?: CrewMember[];
};

export default function Crew({ crew }: CrewProps) {
  const mainCrew = crew?.filter(
    (person) =>
      person.job === "Director" ||
      person.department === "Writing" ||
      person.job === "Producer" ||
      person.job === "Executive Producer"
  );

  if (!mainCrew?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Equipo
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {mainCrew.map((person) => (
          <PersonCard
            key={`${person.id}-${person.job}`}
            name={person.name}
            role={person.job}
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