// middleware/auth.js
const jwt = require('jsonwebtoken');
const secret = 'passwordjwt1';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Si no hay token

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
