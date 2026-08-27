const fs = require("fs");
const path = require("path");

const filePath = path.join(
    __dirname,
    "../../data/history.json"
);

function readHistory(){
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};

function writeHistory(history){
    fs.writeFileSync( filePath, JSON.stringify(history, null, 2));
};

const HistoryModel = {

    async create(userId) {
        const history = readHistory();

        const newHistory = {
            user_id: userId,
            movies: []
        };

        history.push(newHistory);
        writeHistory(history);

        return newHistory;
    },

    async findByUser(userId) {
        const history = readHistory();
        const userHistory = history.find(
            item => item.user_id === userId
        );

        return userHistory || null;
    },

    async addMovie(userId, movieId, watchedAt) {
        const history = readHistory();

        let userHistory = history.find(
            item => item.user_id === userId
        );

        if (!userHistory) {
            userHistory = {
                user_id: userId,
                movies: []
            };

            history.push(userHistory);
        }

        const existingMovie = userHistory.movies.find(
            movie => movie.movie_id === movieId
        );

        if (existingMovie) {
            existingMovie.watched_at = watchedAt;
        } else {
            userHistory.movies.push({
                movie_id: movieId,
                watched_at: watchedAt
            });
        }

        writeHistory(history);

        return userHistory;
    },
};

module.exports = HistoryModel;