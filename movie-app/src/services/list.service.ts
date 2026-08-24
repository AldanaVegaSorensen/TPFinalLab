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

};