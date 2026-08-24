const ListModel = require('../models/lista.model');

const ListService = {

  async createList(userId, name) {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre de la lista es obligatorio');
    }

    return await ListModel.create(userId, name);
  },

  async getUserLists(userId) {
    return await ListModel.findByUser(userId);
  },

  async addMovie(listId, movieId) {
    return await ListModel.addMovie(listId, movieId);
  },

  async removeMovie(listId, movieId) {
    return await ListModel.removeMovie(listId, movieId);
  },

  async updateList(listId, userId, name) {
    if (!name || name.trim().length === 0) {
      throw new Error('El nombre de la lista es obligatorio');
    }

    const list = await ListModel.findById(listId);

    if (!list) {
      throw new Error('Lista no encontrada');
    }

    if (list.user_id !== userId) {
      throw new Error('No tenés permiso para editar esta lista');
    }

    return await ListModel.updateName(listId, name.trim());
  }
};

module.exports = ListService;