const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
// const bcryptjs = require('bcryptjs');
// import bcrypt from 'bcryptjs';


// Generar token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Registrar usuario
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Crear usuario con contraseña encriptada
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    return res.status(201).json({"message": "User registered successfully"});
  } catch (error) {
    return res.status(400).json({ message: error.message });
    
  }
};

// Iniciar sesión
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log(user)
    
    const validate = await bcrypt
    console.log(validate);

    if (user && (validate)) {
      return res.json({ token: generateToken(user._id) });
      // return res.status(200).header('auth-token', token).json(user);
    } else {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
