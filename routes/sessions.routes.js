const express = require("express");
const router = express.Router();
const sessionsController = require("../controller/sessions.controller");

// Definir las rutas para las sesiones
router.post("/login", sessionsController.createSession);
router.get("/logout", sessionsController.logout);

module.exports = router;
