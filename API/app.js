const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const customerAddressRoutes = require('./routes/customerAddresses');
const authRoutes = require('./routes/auth'); // Asegúrate de importar las rutas de autenticación
const authenticateToken = require('./middleware/auth');

app.use(cors()); // Habilitar CORS
app.use(bodyParser.json());

app.use('/api/auth', authRoutes); // Rutas para obtener el token
app.use('/api', authenticateToken, customerAddressRoutes); // Rutas protegidas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
