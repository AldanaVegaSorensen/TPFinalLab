const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require("./routes/movies.routes"); 
const reviewRoutes = require('./routes/review.routes');
const listRoutes = require('./routes/list.routes');
const historyRoutes = require("./routes/history.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/movies", movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/lists', listRoutes);
app.use("/api/history", historyRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",  () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});