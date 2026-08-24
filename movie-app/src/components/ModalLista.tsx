import { useState } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

interface MovieList {
  id: number;
  name: string;
}

interface ModalAddToListProps {
  visible: boolean;
  onClose: () => void;
  movieId: number;
  lists: MovieList[];
  onAddToList: (listId: number, movieId: number) => void;
  onCreateList: (name: string, movieId: number) => void;
}

export default function ModalAddToList({
  visible,
  onClose,
  movieId,
  lists,
  onAddToList,
  onCreateList,
}: ModalAddToListProps) {
  const [showNewList, setShowNewList] = useState(false);
  const [listName, setListName] = useState("");

  

  const handleCreateList = () => {
      if (!listName.trim()) return;

      onCreateList(
          listName.trim(),
          movieId
      );

      setListName("");
      setShowNewList(false);
  };

  const handleAddToList = (listId: number) => {
    onAddToList(
        listId,
        movieId
    );
};

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Agregar a una lista
          </Text>

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Ionicons
              name="close"
              size={28}
              color="white"
            />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content}>

          {!showNewList ? (
            <>
              <Text style={styles.sectionTitle}>
                Tus listas
              </Text>

              {lists.length > 0 ? (
                lists.map((list) => (
                  <Pressable
                    key={list.id}
                    style={styles.listButton}
                    onPress={() => handleAddToList(list.id)}
                  >
                    <Ionicons
                      name="list-outline"
                      size={24}
                      color={COLORS.primary}
                    />

                    <Text style={styles.listName}>
                      {list.name}
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#999"
                    />
                  </Pressable>
                ))
              ) : (
                <Text style={styles.emptyText}>
                  Todavía no tenés listas creadas.
                </Text>
              )}

              <View style={styles.divider} />

              <Pressable
                style={styles.newListButton}
                onPress={() => setShowNewList(true)}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color="white"
                />

                <Text style={styles.newListText}>
                  Crear nueva lista
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>
                Nueva lista
              </Text>

              <Text style={styles.label}>
                Nombre de la lista
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Ej: Películas favoritas"
                placeholderTextColor="#999"
                value={listName}
                onChangeText={setListName}
              />

              <Pressable
                style={[
                  styles.createButton,
                  !listName.trim() && styles.disabledButton,
                ]}
                disabled={!listName.trim()}
                onPress={handleCreateList}
              >
                <Text style={styles.createButtonText}>
                  Crear lista
                </Text>
              </Pressable>

              <Pressable
                style={styles.backButton}
                onPress={() => setShowNewList(false)}
              >
                <Text style={styles.backButtonText}>
                  Volver a mis listas
                </Text>
              </Pressable>
            </>
          )}

        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F7",
  },

  header: {
    height: 65,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "700",
  },

  closeButton: {
    position: "absolute",
    right: 15,
    padding: 6,
  },

  content: {
    padding: 20,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  listButton: {
    backgroundColor: "white",
    minHeight: 60,
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  listName: {
    flex: 1,
    fontSize: 17,
    color: COLORS.text,
    fontWeight: "500",
  },

  emptyText: {
    textAlign: "center",
    color: "#777",
    fontSize: 16,
    marginVertical: 20,
  },

  divider: {
    height: 1,
    backgroundColor: "#DDD",
    width: "100%",
    marginVertical: 10,
  },

  newListButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  newListText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },

  createButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.5,
  },

  createButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  backButton: {
    alignItems: "center",
    padding: 10,
  },

  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});