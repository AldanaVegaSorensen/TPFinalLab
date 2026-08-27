import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS } from '@/src/constants/colors';
import { jwtDecode } from "jwt-decode";
import { useSession } from "../context/AuthContext";
import { Review } from "../types/review";

interface ReviewsProps {
    reviews: Review[];
    onEdit: (review: Review) => void;
    onDelete: (reviewId: number) => void;
}

interface TokenPayload {
    userId: number;
}

export default function Reviews({
    reviews,
    onEdit,
    onDelete
}: ReviewsProps) {
  const { user } = useSession();
console.log(reviews)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Reviews recientes
      </Text>

      {reviews.map((review) => (
        <View
          key={review.id}
          style={styles.review}
        >
          <View style={styles.header}>
            <Text style={styles.user}>
              {review.user.name}
            </Text>

            <View style={styles.rating}>
              <Ionicons name="star" size={15} color={"#FFD700"} />

              <Text style={styles.ratingText}>
                {review.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <Text style={styles.comment}>
            {review.comment}
          </Text>

          <Text style={styles.date}>
            {new Date(
              review.created_at
            ).toLocaleDateString("es-AR")}
          </Text>

          {review.user.id === user?.id && (
              <View>
                  <Pressable onPress={() => onEdit(review)}>
                      <Text style={{color:'white'}}>Editar</Text>
                  </Pressable>

                  <Pressable onPress={() => onDelete(review.id)}>
                      <Text>Eliminar</Text>
                  </Pressable>
              </View>
          )}
          
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
  },

  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  review: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: {
    color: "white",
    fontWeight: "600",
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  star: {
    color: COLORS.accent,
    fontSize: 16,
  },

  ratingText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  comment: {
    color: COLORS.text,
    marginTop: 8,
    lineHeight: 20,
  },

  date: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 8,
  },
});