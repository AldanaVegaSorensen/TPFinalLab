import { MovieCategory } from "../types/movie";
import api from "./api";

const CATEGORY_ROUTES: Record<MovieCategory, string> = {
  popular: "popular",
  top_rated: "top-rated",
  upcoming: "upcoming",
  now_playing: "now-playing"
};

export const movieService = {
  async getPopular() {
    const { data } = await api.get("/movies/popular");
    return data;
  },

  async getMovie(id: number) {
    const { data } = await api.get(`/movies/${id}`);
    console.log("Peliculas obtenidas con get movie:", data)
    return data;
  },

  async getMovies(category: MovieCategory) {
    const route = CATEGORY_ROUTES[category];
    const { data } = await api.get(`/movies/${route}`);
    return data;
  },

  async getAllMovies(cantidad = 10, from = 0) {
    const { data } = await api.get("/movies", {
        params: {
            cantidad,
            from,
        },
    });

    return data;
},

  async searchMovies(query: string, page = 1) {
  const { data } = await api.get("/movies/search", {
    params: {
      query,
      page,
    },
  });

  return data;
},



};