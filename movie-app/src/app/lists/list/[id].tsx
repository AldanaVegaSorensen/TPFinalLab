import IconButton from "@/src/components/IconButton";
import MovieCard from "@/src/components/movieCard";
import { COLORS } from "@/src/constants/colors";
import { useLists } from "@/src/hooks/useList";
import { movieService } from "@/src/services/movie.service";
import { Movie } from "@/src/types/movie";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Alert,
} from "react-native";

export default function ListScreen() {
  const { id } = useLocalSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [listName, setListName] = useState("");

  const {
    updateList,
    removeMovieFromList,
    getList
  } = useLists();

  

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
              <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="white" />
              </View>
          );
      }

  
console.log("MOVIES PARA MOSTRAR:", movies);
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        {editingName ? (
          <TextInput
            style={styles.titleInput}
            value={listName}
            onChangeText={setListName}
            autoFocus
            onSubmitEditing={handleUpdateName}
            placeholder="Nombre de la lista"
            placeholderTextColor="#ccc"
          />
        ) : (
          <Text style={styles.title}>{listName}</Text>
        )}

        <View style={styles.headerActions}>

          {editingName ? (
            // <Pressable
            //   style={styles.iconButton}
            //   onPress={handleUpdateName}
            // >
            //   <Ionicons name="checkmark" size={24} color="white" />
            // </Pressable>

            <IconButton
              icon="checkmark"
              onPress={handleUpdateName}
            />
          ) : (
            // <Pressable
            //   style={styles.iconButton}
            //   onPress={() => setEditingName(true)}
            // >
            //   <Ionicons name="pencil" size={22} color="white" />
            // </Pressable>

            <IconButton
              icon="pencil"
              onPress={() => setEditingName(true)}
            />
            
          )}

          {/* <Pressable
            style={styles.iconButton}
            onPress={() => setEditMode((prev) => !prev)}
          >
            <Ionicons
              name={editMode ? "checkmark-done" : "trash-outline"}
              size={22}
              color="white"
            />
          </Pressable> */}
          <IconButton
              icon={editMode ? "checkmark-done" : "trash-outline"}
              onPress={() => setEditMode((prev) => !prev)}
            />

          {/* <Pressable style={styles.close} onPress={() => router.back()}>
            <Ionicons
              name="close"
              size={28}
              color="white"
            />
          </Pressable> */}

          <IconButton
              icon="close"
              onPress={() => router.back()}
            />

        </View>
      </View>

      {movies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Esta lista todavía no tiene películas.
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <MovieCard movie={item} />

              {editMode && (
                <Pressable
                  style={styles.removeBadge}
                  onPress={() => handleRemoveMovie(item.id)}
                >
                  <Ionicons name="close-circle" size={26} color="#e74c3c" />
                </Pressable>
              )}
            </View>
          )}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    minHeight: 65,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    flexShrink: 1,
  },
  titleInput: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 2,
    marginRight: 10,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  close: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
  },
  row: {
    justifyContent: "flex-start",
    gap: 8,
  },
  content: {
    padding: 12,
  },
  cardWrapper: {
    position: "relative",
  },
  removeBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "white",
    borderRadius: 13,
    zIndex: 1,
  },
});
