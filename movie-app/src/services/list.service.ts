import api from "./api";

export const listService = {
    async create(name: string){
        const {data} = await api.post("/lists", {name})
        return data
    },

    async getLists(){
        const {data} = await api.get("/lists")
        return data    
    },

    async addMovie(listId: number, movieId: number) {
       const {data} = await api.post(`/lists/${listId}/movies`,{movieId})
        return data
    },

    async getById(listId: number){
       const {data} = await api.get(`/lists/${listId}`)
       return data
    },

    async update(listId: number, name: string){
        const {data} = await api.put(`/lists/${listId}`, {name,})
        return data
    },

    removeMovie: (listId: number, movieId: number)=> api.delete(`/lists/${listId}/movies/${movieId}`)

};