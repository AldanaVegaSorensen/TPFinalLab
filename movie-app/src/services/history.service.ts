import api from "./api";

export const historyService = {

    getHistory: () => api.get("/history") ,

    addMovie: ( movieId: number, watchedAt: string) => api.post("/history", { movieId, watchedAt, }),

};