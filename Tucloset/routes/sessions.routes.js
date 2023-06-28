const express = require("express");
const router = express.Router();

// Importar el controlador de sesiones
const sessionsController = require("../controller/sessions.controller");

// Definir las rutas para las sesiones
router.post("/login", sessionsController.createSession);
router.post("/logout", sessionsController.logout);

module.exports = router;
