const authService = require('../services/auth.service');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register(name, email, password);

    res.status(201).json(result);
  } catch (err) {
    
    console.error(err);
    res.status(err.statusCode).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login(email, password);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).json({ error: err.message });
  }
}

module.exports = { register, login };