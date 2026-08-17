const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const movieRoutes = require("./routes/movies.routes"); 
const homeRoutes = require("./routes/home.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use("/movies", movieRoutes);

app.use("/home", homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0",  () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});