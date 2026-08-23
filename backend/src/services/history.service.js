const HistoryModel = require("../models/history.model");

const HistoryService = {

    async createHistory(userId) {
        return await HistoryModel.create(userId);
    },

    async getHistoryByUser(userId) {
        return await HistoryModel.findByUser(userId);
    },

    async addMovie(userId, movieId, watchedAt) {

        return await HistoryModel.addMovie(
            userId,
            movieId,
            watchedAt
        );
    },
};

module.exports = HistoryService;
