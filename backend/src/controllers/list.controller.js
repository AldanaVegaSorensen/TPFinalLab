const ListService = require('../services/list.service');

async function createList(req, res) {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name || name.trim().length === 0) {
     const error = new Error('El nombre de la lista es obligatorio');
                error.statusCode = 422;
                throw error;
    }

    const list = await ListService.createList(userId, name);

    res.status(201).json(list);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });

  }
};

async function getUserLists(req, res){
  try {

    const userId = req.user.userId;

    const lists = await ListService.getUserLists(userId);

    res.status(200).json(lists);

  } catch (error) {
    
    res.status(404).json({
      message: error.message
    });

  }
};

async function addMovie(req, res){
  try {

    const listId = Number(req.params.listId);
    const { movieId } = req.body;

    if (!Number.isInteger(movieId) || movieId <= 0) {
        const error = new Error("El ID de película no es válido");
        error.statusCode = 422;
        throw error;
    }

    if (!Number.isInteger(listId) || listId <= 0) {
        const error = new Error("El ID de la lista no es válido");
        error.statusCode = 422;
        throw error;
    }

    const list = await ListService.addMovie(listId, movieId);

    res.status(200).json(lists);

  } catch (error) {

    res.status(400).json({
      message: error.message
    });

  }
};

async function removeMovie(req, res) {
  try {

    const listId = Number(req.params.listId);
    const movieId = Number(req.params.movieId);

    if (!Number.isInteger(movieId) || movieId <= 0) {
        const error = new Error("El ID de película no es válido");
        error.statusCode = 422;
        throw error;
    }

    if (!Number.isInteger(listId) || listId <= 0) {
        const error = new Error("El ID de la lista no es válido");
        error.statusCode = 422;
        throw error;
    }


    const list = await ListService.removeMovie(listId, movieId);

    res.json(list);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });

  }
};

async function updateList(req, res){
  try {

    const listId = Number(req.params.listId);
    const { name } = req.body;
    const userId = req.user.userId;

    if (!name || name.trim().length === 0) {
      const error = new Error(
                'El nombre de la lista es obligatorio',
            );
            error.statusCode = 404;
            throw error;
    }

    if (!Number.isInteger(listId) || listId <= 0) {
        const error = new Error("El ID de la lista no es válido");
        error.statusCode = 422;
        throw error;
    }

    const list = await ListService.updateList(listId, userId, name);

    res.status(200).json(lists);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

async function getById(req, res){
  try {
    const { id } = req.params;


    const lists = await ListService.getById(id);

    res.json(lists);

  } catch (error) {
    
    res.status(404).json({
      message: error.message
    });

  }
};

module.exports = {
  createList,
  getUserLists,
  addMovie,
  removeMovie,
  updateList,
  getById
};