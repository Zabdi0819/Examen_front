const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const customerAddressRoutes = require('./routes/customerAddresses');
const authenticateToken = require('./middlewares/auth');

app.use(bodyParser.json());
app.use('/api', authenticateToken, customerAddressRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
