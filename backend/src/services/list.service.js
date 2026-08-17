const ListModel = require('../models/list.model');

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
  }

};

module.exports = ListService;