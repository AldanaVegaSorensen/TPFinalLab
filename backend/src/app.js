const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require("./routes/movies.routes"); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});