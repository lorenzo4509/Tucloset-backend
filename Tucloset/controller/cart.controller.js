// Simulación de una base de datos
let carts = [];

// Obtener todos los carritos
const getAllCarts = (req, res) => {
  res.json(carts);
};

// Obtener un carrito por su ID de usuario
const getCart = (req, res) => {
  const userId = req.params.userId;
  const cart = carts.find((cart) => cart.userId === userId);

  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
};

// Crear un nuevo carrito
const createCart = (req, res) => {
  const { userId, items } = req.body;

  const newCart = {
    userId,
    items,
  };

  carts.push(newCart);

  res.status(201).json(newCart);
};

// Actualizar un carrito existente
const updateCart = (req, res) => {
  const userId = req.params.userId;
  const { items } = req.body;

  const cart = carts.find((cart) => cart.userId === userId);

  if (cart) {
    cart.items = items || cart.items;

    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
};

// Eliminar un carrito existente
const deleteCart = (req, res) => {
  const userId = req.params.userId;

  const index = carts.findIndex((cart) => cart.userId === userId);

  if (index !== -1) {
    carts.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
};

module.exports = {
  getAllCarts,
  createCart,
  getCart,
  updateCart,
  deleteCart,
};
