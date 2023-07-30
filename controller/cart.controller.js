const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model")

// Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los carritos" });
  }
};

// Obtener un carrito por su ID de usuario
const getCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await Cart.findOne({ userId });
    console.log(cart, 'CARRRTT')
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Crear un nuevo carrito
const createCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const newCart = await Cart.create({ userId, items });
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Actualizar un carrito existente
const updateCart = async (req, res) => {
  const userId = req.params.userId;
  const { items } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true }
    );

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el carrito" });
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
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el carrito" });
  }
};

const addProductToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Verificar si el usuario tiene un carrito activo
    const cart = await Cart.findOne({ userId });
    console.log(cart, 'CAAAAARRTTT/////')

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Verificar si el producto existe
    const product = await Product.findById(productId);
    console.log(product, 'produuuccttt/////')
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Agregar el producto al carrito
    cart.items.push({ productId, ...product  });
    await cart.save();


    res
      .status(201)
      .json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllCarts,
  createCart,
  getCart,
  updateCart,
  deleteCart,
  addProductToCart,
};
