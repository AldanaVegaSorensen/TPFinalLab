import IconButton from "@/src/components/IconButton";
import MovieCard from "@/src/components/movieCard";
import { useLists } from "@/src/hooks/useList";
import { movieService } from "@/src/services/movie.service";
import { commonStyles } from "@/src/styles/general";
import { listStyles } from "@/src/styles/list.styles";
import { Movie } from "@/src/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { router,  useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text, Pressable, TextInput, Alert, } from "react-native";

export default function ListScreen() {
  const { id } = useLocalSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");

  const { updateList, removeMovieFromList, getList } = useLists();

  

  useEffect(() => {
  const loadList = async () => {
    try {
      setLoading(true);

      const list = await getList(Number(id));

      const responses = await Promise.all(
      list.movies.map((movieId: number) =>
        movieService.getMovie(movieId)
      )
    );

    const moviesData = responses.map(
      (response) => response
    );


    setMovies(moviesData);
      setListName(list.name || "");
    } catch (error) {
      console.error("Error cargando lista:", error);
    } finally {
      setLoading(false);
    }
  };

  if (id) {
    loadList();
  }
}, [id]);

  const handleUpdateName = async () => {
    if (!listName.trim()) return;

    try {
      await updateList(
        Number(id),
        listName.trim()
      );

      setEditingName(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveMovie = (movieId: number) => {
    Alert.alert(
      "Eliminar película",
      "¿Querés sacar esta película de la lista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await removeMovieFromList(Number(id), movieId);
              setMovies((prev) =>
                prev.filter((m) => m.id !== movieId)
              );
            } catch (error) {
              console.error(error);
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

  
  return (
    <View style={commonStyles.darkContainer}>
      <View style={listStyles.header}>

        {editingName ? (
          <TextInput
            style={listStyles.titleInput}
            value={listName}
            onChangeText={setListName}
            autoFocus
            onSubmitEditing={handleUpdateName}
            placeholder="Nombre de la lista"
            placeholderTextColor="#ccc"
          />
        ) : (
          <Text style={listStyles.title}>{listName}</Text>
        )}

        <View style={listStyles.headerActions}>

          {editingName ? (

            <IconButton
              icon="checkmark"
              onPress={handleUpdateName}
            />
          ) : (

            <IconButton
              icon="pencil"
              onPress={() => setEditingName(true)}
            />
            
          )}
          <IconButton
              icon={editMode ? "checkmark-done" : "trash-outline"}
              onPress={() => setEditMode((prev) => !prev)}
            />

          <IconButton
              icon="close"
              onPress={() => router.back()}
            />

        </View>
      </View>

      {movies.length === 0 ? (
        <View style={listStyles.emptyContainer}>
          <Text style={listStyles.emptyText}>
            Esta lista todavía no tiene películas.
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={listStyles.cardWrapper}>
              <MovieCard movie={item} />

              {editMode && (
                <Pressable
                  style={listStyles.removeBadge}
                  onPress={() => handleRemoveMovie(item.id)}
                >
                  <Ionicons name="close-circle" size={26} color="#e74c3c" />
                </Pressable>
              )}
            </View>
          )}
          numColumns={3}
          columnWrapperStyle={listStyles.row}
          contentContainerStyle={listStyles.content}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

