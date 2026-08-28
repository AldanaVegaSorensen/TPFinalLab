import { View, Text, Pressable, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/src/constants/colors";
import { useLists } from "@/src/hooks/useList";
import { useCallback } from "react";
import IconButton from "@/src/components/IconButton";

export default function ListsScreen() {
console.log("EN LA SCREEN DE LISTAS")
    const {
        lists,
        loading,
        error,
        reloadLists,
    } = useLists();

    useFocusEffect(
        useCallback(() => {
          reloadLists();
        }, [])
      );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                  {error }
                </Text>                  
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.title}>Mis listas</Text>

                <IconButton
                  icon="close"
                  onPress={() => router.back()}
                  style={styles.close}
                />
            </View>

            {lists.length === 0 ? (

                <View style={styles.center}>
                    <Ionicons
                        name="list-outline"
                        size={60}
                        color="#999"
                    />

                    <Text style={styles.emptyText}>
                        Todavía no tenés listas creadas.
                    </Text>
                </View>

            ) : (

                <FlatList
                    data={lists}
                    keyExtractor={(item) =>
                        item.id.toString()
                    }
                    contentContainerStyle={
                        styles.listContainer
                    }
                    renderItem={({ item }) => (

                        <Pressable
                            style={styles.listItem}
                            onPress={() =>
                                router.push({
                                    pathname: "/lists/list/[id]",
                                    params: {
                                        id: item.id.toString(),
                                    },
                                })
                            }
                        >

                            <Ionicons
                                name="list"
                                size={30}
                                color={COLORS.primary}
                            />

                            <View style={styles.listInfo}>

                                <Text style={styles.listName}>
                                    {item.name}
                                </Text>

                                <Text style={styles.movieCount}>
                                    {item.movies?.length ?? 0} películas
                                </Text>

                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={24}
                                color="#999"
                            />

                        </Pressable>
                    )}
                />
            )}

        </View>
    );
}


const styles = StyleSheet.create({
  container:{
        flex:1, 
        backgroundColor:COLORS.surface
    },
  containerProfile:{
    alignItems: "center",
    marginBottom: 30,
  },
  texto:{
    color: "#fff",
    fontSize: 24,
    marginBottom: 24,
  },
  profilePic:{
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
  },
  center:{

  },
  text:{

  },
   header:{
        height: 65,
        backgroundColor:COLORS.primary,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:20,
        position:'relative',
        marginBottom:10
    },
  title:{
        color:'white',
        fontSize:22,
        fontWeight: '700'
    },
    close:{
        position:'absolute',
        right: 15,
        padding:6,
    },
  emptyText:{

  },
  listContainer:{

  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
marginHorizontal:10,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  listInfo: {
    flex: 1,
    marginLeft: 15,
  },

  listName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },

  movieCount: {
    color: "#999999",
    fontSize: 14,
  },
  errorText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
})