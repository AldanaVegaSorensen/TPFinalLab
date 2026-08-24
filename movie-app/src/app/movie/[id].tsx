import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, ActivityIndicator, Image, Modal } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useMovie } from "@/src/hooks/useMovie";
import React, { useState } from "react";
import Cast from "@/src/components/Cast";
import Crew from "@/src/components/Crew";
import Reviews from "@/src/components/Review";
import { useReviews } from "@/src/hooks/useReview"
import { COLORS } from '@/src/constants/colors';
import ModalReview from "@/src/components/ModalReview";
import ModalLista from "@/src/components/ModalLista";
import { useHistory } from "../../hooks/useHistory";
import { useLists } from "@/src/hooks/useList";

const {width, height} = Dimensions.get('screen');


export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { movie, loading, error } = useMovie(Number(id));
  const { reviews, loading: reviewsLoading, createReview, reloadReviews} = useReviews(Number(id));
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isListModalVisible, setIsListModalVisible] = useState(false);

  const { addMovie: addToHistory} = useHistory();

  const { lists, createList, addMovieToList} = useLists();

    const handleSaveReview = async (
        fecha: Date,
        rating: number | null,
        comment: string
    ) => {

        try {

            const movieId = Number(id);

            if (rating !== null) {

                await createReview(
                    {movieId,
                    rating,
                    comment}
                );

                console.log("Review guardada:");
            }

            await addToHistory(
                movieId,
                fecha.toISOString()
            );

            await reloadReviews();

            setIsModalVisible(false);

        } catch (error: any) {
        
        }
    };

    const handleCreateList = async (
        name: string,
        movieId: number
    ) => {
        try {
            const newList = await createList(name);

            await addMovieToList(
                newList.id,
                movieId
            );

            console.log("Lista creada y película agregada");

            setIsListModalVisible(false);

        } catch (error: any) {
            console.error(
                "Error creando lista:",
                error.response?.data
            );
        }
    };

    const handleAddToList = async (
        listId: number,
        movieId: number
    ) => {
        try {
            await addMovieToList(
                listId,
                movieId
            );

            console.log("Película agregada a la lista");

            setIsListModalVisible(false);

        } catch (error: any) {
            console.error(
                "Error agregando película:",
                error.response?.data
            );
        }
    };
    
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
        contentContainerStyle={{paddingBottom:20, backgroundColor: COLORS.background,}}
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
                    COLORS.background,
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
                setIsListModalVisible(true)
                }}
            >
                <Ionicons name="add-circle" size={28} color="white" />
                <Text style={styles.actionText}>Agregar a lista</Text>
            </Pressable>

            <Pressable
                style={styles.actionButton}
                onPress={() => {
                // realizar review
                setIsModalVisible(true)
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
        <Reviews reviews={reviews}/>

        {/*MODAL PARA REVIEW y agregar lista */}
        <ModalReview
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onSave={handleSaveReview}
        />

        <ModalLista
            visible={isListModalVisible}
            onClose={() => setIsListModalVisible(false)}
            movieId={movie.id}
            lists={lists}
            onAddToList={handleAddToList}
            onCreateList={handleCreateList}
        />
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
        color:COLORS.text,
        textAlign:"center",
        fontSize: 24
    },
    info:{
        color: COLORS.textSecondary,
        fontWeight: "600",
        fontSize: 16,
        textAlign: "center"
    },
    sinopsis:{
        color: COLORS.textSecondary,
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
        backgroundColor: COLORS.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    actionText: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "600",
    },
    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    ratingText: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: "600",
    },

})