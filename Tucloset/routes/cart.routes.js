const express = require("express");
const router = express.Router();

// Importar controladores de carrito
const {
  getAllCarts,
  createCart,
  getCart,
  updateCart,
  deleteCart,
  addProductToCart,
} = require("../controller/cart.controller");

// Rutas del carrito
router.get("/", getAllCarts);
router.get("/:userId", getCart);
router.post("/", createCart);
router.put("/:userId", updateCart);
router.delete("/:userId", deleteCart);
router.post("/addItem", addProductToCart);

module.exports = router;
