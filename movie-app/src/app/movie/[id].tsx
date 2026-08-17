import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, ActivityIndicator, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useMovie } from "@/src/hooks/useMovie";
import React from "react";
import Cast from "@/src/components/Cast";
import Crew from "@/src/components/Crew";

const {width, height} = Dimensions.get('screen');


export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { movie, loading, error } = useMovie(Number(id));
    
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View>
        <Text>{error ?? "Película no encontrada"}</Text>
      </View>
    );
  }

  return (
    <ScrollView
        contentContainerStyle={{paddingBottom:20, backgroundColor: '#414141',}}
    >
        <View style={{width: "100%"}}>
            {/*Header */}
            <SafeAreaView style={styles.container}>
                <Pressable style={{padding: 4, borderRadius: 12 }} onPress={()=> router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={28}
                        color="white"
                    />
                </Pressable>
            </SafeAreaView>
        
            <View style={{ width, height: height * 0.45, position: "relative", }} >
                <Image
                    source={{
                    uri:
                        "https://image.tmdb.org/t/p/w500" +
                        movie.poster_path,
                    }}
                    style={{
                    width: "100%",
                    height: "100%",
                    }}
                />

                <LinearGradient
                    colors={[
                    "transparent",
                    "rgba(70, 66, 66, 0.5)",
                    "#414141",
                    ]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={{ position: "absolute", top: 0, left: 0,right: 0,bottom: 0}}
                />
                </View>

                {/*INFO */}
                <View style={{marginTop: -(height*0.09), gap: 12}}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.info}>{movie.release_date} | {movie.runtime}m | {movie.genres.map((genre) => genre.name).join(" • ")} </Text>
                    <Text style={styles.sinopsis}>{movie.overview}</Text>
                </View>
        </View>

        <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#FFD700" />

            <Text style={styles.ratingText}>
                {movie.vote_average.toFixed(1)}
            </Text>
        </View>

        {/*ACCIONES */}
        <View style={styles.actions}>
            
            <Pressable
                style={styles.actionButton}
                onPress={() => {
                // agregar a lista
                }}
            >
                <Ionicons name="add-circle" size={28} color="white" />
                <Text style={styles.actionText}>Agregar a lista</Text>
            </Pressable>

            <Pressable
                style={styles.actionButton}
                onPress={() => {
                // realizar review
                }}
            >
                <Ionicons name="eye" size={28} color="white" />
                <Text style={styles.actionText}>Review</Text>
            </Pressable>
        </View>

        {/*CAST Y CREW */}
        <View>
            <Cast cast={movie.credits.cast}></Cast>
            <Crew crew={movie.credits.crew}></Crew>
        </View>

        {/* REVIEWS MAS RECIENTES */}
        

    </ScrollView>
  );
}

const styles  = StyleSheet.create({
    container: {
        position: "absolute", 
        zIndex: 20, 
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    title:{
        color:"white",
        textAlign:"center",
        fontSize: 24
    },
    info:{
        color: "#a3a3a3",
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center"
    },
    sinopsis:{
        color: "#a3a3a3",
        fontSize: 15,
        lineHeight: 22,
        marginTop: 4,
        marginHorizontal:15,
    },
    actions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
        paddingHorizontal: 15,
    },

    actionButton: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        backgroundColor: "#926986",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    actionText: {
        color: "white",
        fontSize: 14,
        fontWeight: "600",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    ratingText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },

})