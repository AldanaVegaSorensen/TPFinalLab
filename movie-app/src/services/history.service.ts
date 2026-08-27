import api from "./api";

export const historyService = {

    async getHistory() { 
        const { data } = await api.get("/history") 
        return data
    },

    addMovie: ( movieId: number, watchedAt: string) => api.post("/history", { movieId, watchedAt, }),

    async updateMovie(movieId: number, watchedAt: string) {
        const { data } =  await api.put(`/history/${movieId}`, {watchedAt})
        return data
    ;
}

};