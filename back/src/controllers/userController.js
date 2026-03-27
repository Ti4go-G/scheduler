const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createUser = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Por favor, forneca login e senha' });
  }

  try {
    const existingUser = await User.findOne({ where: { login } });
    if (existingUser) {
      return res.status(409).json({ message: 'Usuario ja cadastrado' });
    }

    const user = await User.create({ login, password });
    const userJson = user.toJSON();
    delete userJson.password;
    return res.status(201).json(userJson);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ message: 'Por favor, forneca login e senha' });
  }

  try {
    const user = await User.findOne({ where: { login } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Login ou senha invalidos' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.status(200).json({ message: 'login realizado com sucesso', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro ao buscar o usuario' });
  }
};

module.exports = {
  createUser,
  loginUser,
};
