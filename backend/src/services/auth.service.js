const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const CustomError = require('../errors/CustomError');
const HistoryService = require('./history.service');

async function register(name, email, password) {
  const existing = await UserModel.findByEmail(email);

  if (existing) {
    const error = new CustomError("El email ya está registrado.", 409)
    throw error
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create(name, email, passwordHash);

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  await HistoryService.createHistory(user.id);

  return { token, user };
}


async function login(email, password) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      const error = new CustomError("Credenciales inválidas.", 401)
      throw error
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
        const error = new CustomError("Credenciales inválidas.", 401)
      throw error
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}

module.exports = {
  register, login
};