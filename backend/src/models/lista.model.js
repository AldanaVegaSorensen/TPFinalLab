const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/listas.json');

function readLists() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeLists(lists) {
  fs.writeFileSync(filePath, JSON.stringify(lists, null, 2));
}

const ListModel = {
  async create(userId, name) {
    const lists = readLists();

    const newList = {
      id: lists.length ? lists[lists.length - 1].id + 1 : 1,
      user_id: userId,
      name,
      movies: [],
      created_at: new Date().toISOString(),
    };

    lists.push(newList);
    writeLists(lists);

    return newList;
  },

  async findByUser(userId) {
    const lists = readLists();
    return lists.filter((list) => list.user_id === userId);
  },

  async findById(id) {
    const lists = readLists();
    return lists.find((list) => list.id === id);
  },

  async addMovie(listId, movieId) {
    const lists = readLists();
    const list = lists.find((list) => list.id === listId);

    if (!list) {
      return null;
    }

    if (!list.movies.includes(movieId)) {
      list.movies.push(movieId);
    }

    writeLists(lists);

    return list;
  },

  async removeMovie(listId, movieId) {
    const lists = readLists();
    const list = lists.find((list) => list.id === listId);

    if (!list) {
      return null;
    }

    list.movies = list.movies.filter((id) => id !== movieId);

    writeLists(lists);

    return list;
  },

  async updateName(listId, name) {
  const lists = readLists();
  const list = lists.find((list) => list.id === listId);

  if (!list) {
    return null;
  }

  list.name = name;

  writeLists(lists);

  return list;
},

  
};

module.exports = ListModel;