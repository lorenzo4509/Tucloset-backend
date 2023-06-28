const express = require('express');
const router = express.Router();

// Ruta de inicio
router.get('/', (req, res) => {
  res.send('¡Bienvenido a Tucloset!');
});

module.exports = router;