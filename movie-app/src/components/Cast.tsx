import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { CastMember } from "../types/movie";


type Props = {
  cast?: CastMember[];
};

export default function Cast({cast}:Props){
    const topCast = cast?.slice(0,10)

    return (
        <View style={{marginVertical: 20}}>
            <Text style={styles.title}>
                Top Cast
            </Text>

            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {topCast && topCast.map((person)=>{
                    return (
                        <TouchableOpacity
                            key={person.id}
                            style={{marginRight:20, alignItems:'center'}}
                        >
                            <Image
                                style={{
                                    borderRadius: 16,
                                    height: 100,
                                    width: 80,
                                }}
                                source={{
                                    uri: person.profile_path
                                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                    : "https://via.placeholder.com/80x100",
                                }}
                            />


                            <Text style={styles.character}>
                                {person.character?.length > 12
                                    ? person.character.slice(0, 12) + "..."
                                    : person.character}
                            </Text>

                            <Text style={styles.name}>
                                {person.name?.length > 12
                                    ? person.name.slice(0, 12) + "..."
                                    : person.name}
                            </Text>
                        </TouchableOpacity>
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