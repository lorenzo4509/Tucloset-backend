const User = require("../models/User.model");
const express = require("express");
const router = express.Router();

const getUser = async (req, res) => {
  const userId = req.params.userId;
  console.log('getuser: ', userId)
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

router.get("/", (req, res, next) => {
    User.find()
      .then((user) => {
        res.status(200).json({ user });
      })
      .catch((err) => next(err));
  });

router.get("/:userId", getUser);

module.exports = router;
