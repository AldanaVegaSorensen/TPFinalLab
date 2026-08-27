import { useEffect, useState } from "react";
import { reviewService } from "@/src/services/review.service";
import { Review } from "../types/review";



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
      console.log("Reviews obtenidas: ",response.data)
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

 const updateReview = async (
    reviewId: number,
    rating: number,
    comment: string
) => {
    const response = await reviewService.update(
        reviewId,
        rating,
        comment
    );

    await loadReviews();

    return response;
};

 const deleteReview = async (reviewId: number) => {
  try {
    await reviewService.delete(reviewId);
    await loadReviews();
  } catch (error) {
    console.error("Error eliminando review:", error);
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
    updateReview,
    deleteReview,
  };
}

export { Review };
