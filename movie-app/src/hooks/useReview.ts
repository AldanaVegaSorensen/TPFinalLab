import { useEffect, useState } from "react";
import { reviewService } from "@/src/services/review.service";

export type Review = {
  id: number;
  movieId: number;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
};

export function useReview(movieId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await reviewService.getByMovie(movieId);

        setReviews(response.data);
      } catch (err) {
        console.error(
          "Error cargando reviews:",
          err
        );
        setError("No se pudieron cargar las reviews");
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [movieId]);

  return {
    reviews,
    loading,
    error,
  };
}