import api from "./api";

export const movieService = {

  getPopular: () => api.get("/movies/popular"),

  getMovie: (id: number) => api.get(`/movies/${id}`),

  getTopRated: () => api.get("movies/top-rated"),

  getUpcoming: () => api.get("/movies/upcoming"),

  getByGenre: (genreId: number) => api.get(`/movies/genre/${genreId}`),

  getHome: () => api.get("/movies/home"),

  
};