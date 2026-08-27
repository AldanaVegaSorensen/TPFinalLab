const HistoryModel = require("../models/history.model");

const HistoryService = {

    async createHistory(userId) {
        const existing = await HistoryModel.findByUser(userId);

        if (existing) {
            throw new CustomError(
                "El historial del usuario ya existe.",
                409
            );
        }
        
        return await HistoryModel.create(userId);
    },

    async getHistoryByUser(userId) {
        const history = await HistoryModel.findByUser(userId); 

        if (!history) {
            throw new CustomError(
                "Historial no encontrado",
                404
            );
        }

        return history
    },

    async addMovie(userId, movieId, watchedAt) {

        return await HistoryModel.addMovie(
            userId,
            movieId,
            watchedAt
        );
    },

    async updateMovie(userId, movieId, watchedAt) {
        const history = await HistoryModel.updateMovie(
            userId,
            movieId,
            watchedAt
        );

        if (!history) {
            throw new CustomError(
                "La película no se encuentra en el historial.",
                404
            );
        }

        return history;
    },

};

module.exports = HistoryService;
