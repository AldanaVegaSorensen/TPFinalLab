import api from "./api";

export const listService = {

    getLists: () => {
        return api.get("/lists");
    },

    create: (name: string) => {
        return api.post("/lists", {name});
    },

    addMovie: (listId: number, movieId: number) => {
        return api.post(`/lists/${listId}/movies`,{movieId});
    },

    getById: (listId: number) => {
        return api.get(`/lists/${listId}`);
    },

    update: (listId: number, name: string) =>
    api.put(`/lists/${listId}`, {
        name,
    }),

    removeMovie: (listId: number, movieId: number) =>{
        return api.delete(`/lists/${listId}/movies/${movieId}`);
    },
};