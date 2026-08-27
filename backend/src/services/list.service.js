const ListModel = require('../models/lista.model');

const ListService = {

  async createList(userId, name) {
    return await ListModel.create(userId, name);
  },

  async getUserLists(userId) {
    const lists = await ListModel.findByUser(userId);

    if (!lists) {
      const error = new Error(
                "No se encontraron listas",
            );
            error.statusCode = 404;
            throw error;
    }
    return lists
  },

  async addMovie(listId, movieId) {
    const list = await ListModel.addMovie(listId, movieId);

    if (!list) {
        throw new CustomError(
            "Lista no encontrada",
            404
        );
    }
    return list
  },

  async removeMovie(listId, movieId) {
    return await ListModel.removeMovie(listId, movieId);
  },

  async updateList(listId, userId, name) {
    

    const list = await ListModel.findById(listId);

    if (!list) {
      const error = new Error(
                "Lista no encontrada",
            );
            error.statusCode = 404;
            throw error;
    }

    if (list.user_id !== userId) {
      const error = new Error(
                "No tenés permiso para editar esta lista"
            );
            error.statusCode = 403;
            throw error;
    }

    return await ListModel.updateName(listId, name.trim());
  },

  async getById(listId) {
    const list = await ListModel.findById(listId);

    if (!list) {
      const error = new Error(
                "Lista no encontrada",
            );
            error.statusCode = 404;
            throw error;
    }

    return list
  },
};

module.exports = ListService;