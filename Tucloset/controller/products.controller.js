// Simulación de una base de datos
let products = [];

// Obtener todos los productos
const getAllProducts = (req, res) => {
  res.json(products);
};

// Obtener un producto por su ID
const getProductById = (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  const { id, name, price } = req.body;

  const newProduct = {
    id,
    name,
    price,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};

// Actualizar un producto existente
const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;

  const product = products.find((product) => product.id === id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;

    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

// Eliminar un producto existente
const deleteProduct = (req, res) => {
  const id = req.params.id;

  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
