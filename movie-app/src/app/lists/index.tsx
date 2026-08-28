import { View, Text, Pressable, FlatList, ActivityIndicator } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/src/constants/colors";
import { useLists } from "@/src/hooks/useList";
import { useCallback } from "react";
import IconButton from "@/src/components/IconButton";
import { commonStyles } from "@/src/styles/general";
import { listStyles } from "@/src/styles/list.styles";

export default function ListsScreen() {
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
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={commonStyles.darkContainer}>
                <Text style={commonStyles.errorText}>
                  {error }
                </Text>                  
            </View>
        );
    }

    return (
        <View style={commonStyles.darkContainer}>

            <View style={commonStyles.header}>
                <Text style={commonStyles.centeredTitle}>Mis listas</Text>

                <IconButton
                  icon="close"
                  onPress={() => router.back()}
                  style={commonStyles.close}
                />
            </View>

            {lists.length === 0 ? (

                <View>
                    <Ionicons
                        name="list-outline"
                        size={60}
                        color="#999"
                    />

                    <Text style={commonStyles.text}>
                        Todavía no tenés listas creadas.
                    </Text>
                </View>

            ) : (

                <FlatList
                    data={lists}
                    keyExtractor={(item) =>
                        item.id.toString()
                    }
                    renderItem={({ item }) => (

                        <Pressable
                            style={listStyles.listItem}
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

                            <View style={listStyles.listInfo}>

                                <Text style={listStyles.listName}>
                                    {item.name}
                                </Text>

                                <Text style={listStyles.movieCount}>
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
