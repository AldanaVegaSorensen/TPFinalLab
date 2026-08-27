const HistoryService = require("../services/history.service");

async function getHistory(req, res, next) {
        try {
            const userId = req.user.userId;

            const history = await HistoryService.getHistoryByUser(userId);

            res.status(200).json(history);

        } catch (error) {
            console.error("Error obteniendo historial:", error);
            next(error);
        }
    };

    async function addMovie(req, res, next) {
        try {
            const userId = req.user.userId;

            const movieId = Number(req.body.movieId);
            const { watchedAt } = req.body;

            // Validar movieId
            if (!Number.isInteger(movieId) || movieId <= 0) {
                const error = new Error(
                    "El ID de la película debe ser un número entero mayor que 0."
                );
                error.statusCode = 422;
                throw error;
            }

            // Validar watchedAt
            if (watchedAt !== undefined) {
                if (
                    typeof watchedAt !== "string" ||
                    isNaN(Date.parse(watchedAt))
                ) {
                    const error = new Error(
                        "La fecha de visualización no es válida."
                    );
                    error.statusCode = 422;
                    throw error;
                }
            }

            const history = await HistoryService.addMovie(
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
            next(error);
        }
    }

module.exports = {getHistory, addMovie};