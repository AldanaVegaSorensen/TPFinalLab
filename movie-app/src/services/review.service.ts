import api from "./api";

export const reviewService = {
  getByMovie: (movieId: number) => {
   return api.get(`/reviews/movie/${movieId}`)
  },

};