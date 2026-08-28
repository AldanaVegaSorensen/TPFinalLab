import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions, ActivityIndicator, Image, Modal, Alert } from "react-native";
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
import { Review } from "@/src/types/review";
import ActionButton from "@/src/components/ActionButton";
import { commonStyles } from "@/src/styles/general";
import { movieStyles } from "@/src/styles/movie.styles";

const {width, height} = Dimensions.get('screen');


export default function MovieDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { movie, loading, error } = useMovie(Number(id));
    const { reviews, loading: reviewsLoading, createReview, reloadReviews, updateReview, deleteReview} = useReviews(Number(id));
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isListModalVisible, setIsListModalVisible] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    
    const { history, addMovie: addToHistory, updateHistory } = useHistory();

    const { lists, createList, addMovieToList} = useLists();
  

    const handleSaveReview = async (
        fecha: Date,
        rating: number | null,
        comment: string
    ) => {
        try {
            if (rating === null) return;

            const movieId = Number(id);

            if (editingReview) {
                await updateReview(
                    editingReview.id,
                    rating,
                    comment
                );

                await updateHistory(
                    movieId,
                    fecha.toISOString()
                );
        } else {

            // CREAR
            await createReview({
                movieId,
                rating,
                comment
            });

            console.log("Review creada");

            await addToHistory(
                movieId,
                fecha.toISOString()
            );
        }

            await reloadReviews();
            setIsModalVisible(false);

        } catch (error: any) {
        }
    };

    const handleEditReview = (review: Review) => {
        setEditingReview(review);
        setIsModalVisible(true);
    };

    const watchedAt = history?.movies.find(
        (item) => item.movie_id === Number(id)
    )?.watched_at;

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
    
    const handleDeleteReview = async (reviewId: number) => {
        Alert.alert(
            "Eliminar review",
            "¿Querés eliminar la review?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteReview(reviewId);

                            await reloadReviews();

                            console.log("Review eliminada");

                        } catch (error: any) {
                            console.error(
                                "Error eliminando review:",
                                error.response?.data || error
                            );
                        }
                    },
                },
            ]
        );
    };

  if (loading) {
    return (
        <View style={commonStyles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
  }

  if (error || !movie) {
    return (
          <View style={commonStyles.darkContainer}>
            <Text style={commonStyles.errorText}>
              {error ?? "Película no encontrada"}
            </Text>
          </View>
        );
  }

  return (
    <ScrollView
        contentContainerStyle={movieStyles.contentContainer}
    >
        <View style={{width: "100%"}}>
            {/*Header */}
            <SafeAreaView style={movieStyles.container}>
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
                    <Text style={movieStyles.title}>{movie.title}</Text>
                    <Text style={movieStyles.info}>{movie.release_date} | {movie.runtime}m | {movie.genres.map((genre) => genre.name).join(" • ")} </Text>
                    <View style={movieStyles.rating}>
                        <Ionicons name="star" size={18} color="#FFD700" />

                        <Text style={movieStyles.ratingText}>
                            {movie.vote_average.toFixed(1)}
                        </Text>
                    </View>
                    <Text style={movieStyles.sinopsis}>{movie.overview}</Text>
                </View>
        </View>


        {/*ACCIONES */}
        <View style={movieStyles.actions}>
            
            <ActionButton
                icon="add-circle"
                title="Agregar a lista"
                onPress={() => setIsListModalVisible(true)}
            />

            <ActionButton
                icon="eye"
                title="Review"
                onPress={() => setIsModalVisible(true)}
            />
        </View>

        {/*CAST Y CREW */}
        <View>
            <Cast cast={movie.credits.cast}></Cast>
            <Crew crew={movie.credits.crew}></Crew>
        </View>

        {/* REVIEWS MAS RECIENTES */}
        <Reviews
            reviews={reviews}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
        />

        {/*MODAL PARA REVIEW y agregar lista */}
        <ModalReview
            visible={isModalVisible}
            onClose={() => {
                setIsModalVisible(false);
                setEditingReview(null);
            }}
            onSave={handleSaveReview}
            review={editingReview}
            watchedAt={watchedAt}
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
