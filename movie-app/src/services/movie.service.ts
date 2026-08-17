import api from "./api";

const CATEGORY_ROUTES: Record<string, string> = {
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

  getMovie: (id: number) => {
    return api.get(`/movies/${id}`);
  },

  async getTopRated() {
    const { data } = await api.get("/movies/top-rated");
    return data;
  },

  async getUpcoming() {
    const { data } = await api.get("/movies/upcoming");
    return data;
  },

  async getByGenre(genreId: number) {
    const { data } = await api.get(`/movies/genre/${genreId}`);
    return data;
  },

  async getNowPlaying() {
    const { data } = await api.get("/movies/now-playing");
    return data;
  },

  async getMovies(category: string) {
    const route = CATEGORY_ROUTES[category];
    const { data } = await api.get(`/movies/${route}`);
    return data;
  },

  async getAllMovies(page = 1) {
    const { data } = await api.get("/movies", {
      params: { page },
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