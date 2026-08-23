const HistoryService = require("../services/history.service");

const HistoryController = {

    async getHistory(req, res) {
        try {
            console.log("REQ.USER:", req.user);
            const userId = req.user.userId;

            const history =
                await HistoryService.getHistoryByUser(userId);

            res.status(200).json(history);

        } catch (error) {
            console.error(
                "Error obteniendo historial:",
                error
            );

            res.status(500).json({
                message: "Error al obtener el historial"
            });
        }
    },

    async addMovie(req, res) {
        try {
            
            const userId = req.user.userId;

            const { movieId, watchedAt } = req.body;


            const history =
                await HistoryService.addMovie(
                    userId,
                    movieId,
                    watchedAt
                );

            res.status(201).json(history);

        } catch (error) {
            console.error(
                "Error agregando película al historial:",
                error
            );

            res.status(400).json({
                message: error.message
            });
        }
    },
};

module.exports = HistoryController;