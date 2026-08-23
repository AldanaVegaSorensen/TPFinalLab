import api from "./api";

export const historyService = {

    getHistory: () => {
        return api.get("/history");
    },

    addMovie: ( movieId, watchedAt) => {
        return api.post("/history", { movieId, watchedAt, });
    },

    removeMovie: (movieId) => {
        return api.delete(`/history/${movieId}`);
    },

};