import { Ionicons } from "@expo/vector-icons";
import { View, Text, Pressable, } from "react-native";
import { useSession } from "../context/AuthContext";
import { Review } from "../types/review";
import { styles } from "../styles/review.styles";

interface ReviewsProps {
    reviews: Review[];
    onEdit: (review: Review) => void;
    onDelete: (reviewId: number) => void;
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
                      <Text style={{color:'white'}}>Eliminar</Text>
                  </Pressable>
              </View>
          )}
          
        </View>
      ))}
    </View>
  );
}
