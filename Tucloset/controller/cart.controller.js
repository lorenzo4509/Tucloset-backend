const Cart = require('../models/Cart.model');

// Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
};

// Obtener un carrito por su ID de usuario
const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Crear un nuevo carrito
const createCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const newCart = await Cart.create({ userId, items });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

// Actualizar un carrito existente
const updateCart = async (req, res) => {
  const userId = req.params.userId;
  const { items } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate({ userId }, { items }, { new: true });

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};

// Eliminar un carrito existente
const deleteCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOneAndRemove({ userId });

    if (cart) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el carrito' });
  }
};

module.exports = {
  getAllCarts,
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
