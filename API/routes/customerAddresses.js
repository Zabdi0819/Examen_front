const express = require('express');
const router = express.Router();
const { CustomerAddress } = require('../models'); // Ajusta según tu estructura

// Crear un nuevo registro
router.post('/customer-addresses', async (req, res) => {
  try {
    const address = await CustomerAddress.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leer todos los registros
router.get('/customer-addresses', async (req, res) => {
  try {
    const addresses = await CustomerAddress.findAll();
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Leer un registro por ID
router.get('/customer-addresses/:id', async (req, res) => {
  try {
    const address = await CustomerAddress.findByPk(req.params.id);
    if (address) {
      res.status(200).json(address);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un registro
router.put('/customer-addresses/:id', async (req, res) => {
  try {
    const [updated] = await CustomerAddress.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAddress = await CustomerAddress.findByPk(req.params.id);
      res.status(200).json(updatedAddress);
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un registro
router.delete('/customer-addresses/:id', async (req, res) => {
  try {
    const deleted = await CustomerAddress.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
