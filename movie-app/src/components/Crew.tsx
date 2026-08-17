import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { CrewMember } from "../types/movie";


type Props = {
  crew?: CrewMember[];
};

export default function Crew({crew}:Props){
    const mainCrew = crew?.filter(
    (person) =>
      person.job === "Director" ||
      person.department === "Writing" ||
      person.job === "Producer" ||
      person.job === "Executive Producer"
  );

    return (
        <View style={{marginVertical: 20}}>
            <Text style={styles.title}>
                Equipo
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {mainCrew?.map((person)=>{
                    return (
                        <View
                            key={`${person.id}-${person.job}`}
                            style={{marginRight:20, alignItems:'center'}}
                        >
                            <Image
                                style={{
                                    borderRadius: 16,
                                    height: 100,
                                    width: 80,
                                }}
                                source={person.profile_path
                                    ? {
                                        uri: `https://image.tmdb.org/t/p/w185${person.profile_path}`,
                                        }
                                    : require("@/src/assets/images/Person_Placeholder.png")
                                }
                            />


                            <Text style={styles.character}>
                                {person.job?.length > 12
                                    ? person.job.slice(0, 12) + "..."
                                    : person.job}
                            </Text>

                            <Text style={styles.name}>
                                {person.name?.length > 12
                                    ? person.name.slice(0, 12) + "..."
                                    : person.name}
                            </Text>
                        </View>
                    )}
                )}
                
            </ScrollView>
        </View>
    )
}

const styles  = StyleSheet.create({
    title:{
        color:"white",
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 20, 
    },
    character: {
        color: "white",
        marginTop: 5,
        fontSize: 12,
        textAlign: "center",
    },

    name: {
        color: "#a3a3a3",
        marginTop: 2,
        fontSize: 12,
        textAlign: "center",
    },
})