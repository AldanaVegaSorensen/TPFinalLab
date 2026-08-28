import { useState } from "react";
import { Modal, View, Text, Pressable, TextInput, ScrollView, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { MovieList } from "../types/list";
import IconButton from "./IconButton";
import { router } from "expo-router";
import ActionButton from "./ActionButton";
import PrimaryButton from "./PrimaryButton";
import { modalStyles } from "../styles/modalList.styles";
import { commonStyles } from "../styles/general";
import { listStyles } from "../styles/list.styles";


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
      <View style={commonStyles.darkContainer}>

        {/* Header */}
        <View style={commonStyles.header}>
            <Text style={commonStyles.centeredTitle}>Agregar a lista</Text>
            <IconButton
                icon="close"
                onPress={() => router.back()}
                style={commonStyles.close}
            />
        </View>

        <ScrollView contentContainerStyle={modalStyles.content}>

          {!showNewList ? (
            <>
              <Text style={modalStyles.sectionTitle}>
                Tus listas
              </Text>

              {lists.length > 0 ? (
                lists.map((list) => (
                  <Pressable
                    key={list.id}
                    style={listStyles.listItem}
                    onPress={() => handleAddToList(list.id)}
                  >
                    <Ionicons
                      name="list-outline"
                      size={24}
                      color={COLORS.primary}
                    />

                    <Text style={listStyles.listName}>
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
                <Text style={modalStyles.emptyText}>
                  Todavía no tenés listas creadas.
                </Text>
              )}

              <View style={commonStyles.divider} />

              <ActionButton
                icon="add-circle-outline"
                title="Crear nueva lista"
                onPress={() => setShowNewList(true)}
              />
            </>
          ) : (
            <>
              <Text style={commonStyles.title}>
                Nueva lista
              </Text>

              <Text style={commonStyles.text}>
                Nombre de la lista
              </Text>

              <TextInput
                style={commonStyles.inputText}
                placeholder="Ej: Películas favoritas"
                placeholderTextColor="#999"
                value={listName}
                onChangeText={setListName}
              />

              <PrimaryButton 
                title={"Crear lista"} 
                onPress={handleCreateList} 
                disabled={!listName.trim()}>
              </PrimaryButton>

              <Pressable
                style={modalStyles.backButton}
                onPress={() => setShowNewList(false)}
              >
                <Text style={modalStyles.backButtonText}>
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

