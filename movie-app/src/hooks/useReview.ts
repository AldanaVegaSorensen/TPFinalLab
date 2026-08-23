import { useEffect, useState } from "react";
import { reviewService } from "@/src/services/review.service";

export type Review = {
  id: number;
  movieId: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    name: string;
  };
};

export function useReviews(movieId: number) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await reviewService.getByMovie(movieId);

      setReviews(response.data);
    } catch (error) {
      console.error("Error cargando reviews:", error);
      setError("No se pudieron cargar las reviews");
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (
    data: {
      movieId: number;
      rating: number;
      comment: string;
    }
  ) => {
    try {
      const response = await reviewService.create(data);

      await loadReviews();

      return response.data;
    } catch (error) {
      console.error("Error creando review:", error);
      throw error;
    }
  };

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  return {
    reviews,
    loading,
    error,
    createReview,
    reloadReviews: loadReviews,
  };
}