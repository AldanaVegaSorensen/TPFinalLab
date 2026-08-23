import { Ionicons, } from "@expo/vector-icons";
import { useState } from "react";
import { View, Pressable } from "react-native";

interface StarRatingProps {
    rating: number;
    onChange: (rating: number) => void;
}


export function StarRating({
    rating,
    onChange,
}: StarRatingProps) {
    return(
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
        {Array(10).fill(null).map((_, index) => {
            const starNumber = index + 1;

            return (
            <Pressable
                key={index}
                onPress={() => onChange(starNumber)}

            >
                <Ionicons
                name={starNumber <= rating ? "star" : "star-outline"}
                size={35}
                color="#FFD700"
                />
            </Pressable>
            );
        })}
    </View>
    )
}