const ListService = require('../services/list.service');

async function createList(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.userId;
    const list = await ListService.createList(userId, name);

    res.json(list);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });

  }
};

const getUserLists = async (req, res) => {
  try {
    console.log("===== GET LISTS =====");
        console.log("REQ.USER:", req.user);

    const userId = req.user.userId;

     console.log("userId:", userId);

    const lists = await ListService.getUserLists(userId);
     console.log("LISTAS:", lists);

    res.json(lists);

  } catch (error) {

    console.error("ERROR GET LISTS:", error);
    
    res.status(500).json({
      message: error.message
    });

  }
};

const addMovie = async (req, res) => {
  try {

    const listId = Number(req.params.listId);
    const { movieId } = req.body;

    const list = await ListService.addMovie(listId, movieId);

    res.json(list);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

const removeMovie = async (req, res) => {
  try {

    const listId = Number(req.params.listId);
    const movieId = Number(req.params.movieId);

    const list = await ListService.removeMovie(listId, movieId);

    res.json(list);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });

  }
};

module.exports = {
  createList,
  getUserLists,
  addMovie,
  removeMovie
};