import api from "./api";

export const listService = {
    create: (name: string) => api.post("/lists", {name}),

    getLists: () => api.get("/lists"),    

    addMovie: (listId: number, movieId: number) => api.post(`/lists/${listId}/movies`,{movieId}),

    getById: (listId: number) => api.get(`/lists/${listId}`),

    update: (listId: number, name: string) => api.put(`/lists/${listId}`, {name,}),

    removeMovie: (listId: number, movieId: number) => api.delete(`/lists/${listId}/movies/${movieId}`),
};