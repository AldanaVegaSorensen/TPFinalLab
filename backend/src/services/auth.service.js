const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const CustomError = require('../errors/CustomError');

async function register(name, email, password) {
  // Validar nombre
  if (!name || name.trim().length < 2) {
    const error = new CustomError("El nombre debe tener al menos 2 caracteres.", 422)
    throw error
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    const error = new CustomError("El email no es válido.", 422)
    throw error
  }

  // Validar contraseña
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) ||!/[0-9]/.test(password)) {
    const error = new CustomError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número .", 422)
    throw error
  }

  // Verificar email existente
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
    console.log(user)
    if (!user) {
      const error = new CustomError("Credenciales inválidas.", 400)
      throw error
    }

    const isValid = await bcrypt.compare(password, user.password_hash);

    if (!isValid) {
        const error = new CustomError("Credenciales inválidas.", 400)
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