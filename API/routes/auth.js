const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = 'passwordjwt1';

// Endpoint para obtener un token
router.post('/get-token', (req, res) => {
  const { username, password } = req.body;

  // Validar credenciales 
  if (username === 'user' && password === 'password') {
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
