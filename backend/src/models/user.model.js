const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/users.json');

function readUsers() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

const UserModel = {
  async create(name, email, passwordHash) {
    const users = readUsers();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      email,
      password_hash: passwordHash,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  },

  async findByEmail(email) {
    const users = readUsers();
    return users.find((u) => u.email === email);
  },
};

module.exports = UserModel;