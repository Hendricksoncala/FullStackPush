// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Cargar el usuario y asignarlo a req.user
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'No autorizado, token fallido' });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado, sin token' });
  }
};

module.exports = { protect };
