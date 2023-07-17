const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const User = require("../models/User.model");

// POST /products - Creates a new product in the database
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, price, quantity} = req.body;

  if (name === "" || description === "" || price === "" || quantity === "") {
    res.status(400).json({ message: "Provide name, description, price, and quantity" });
    return;
  }
console.log(req.payload);

  const product = new Product({
    name,
    description,
    price,
    quantity,
    shopper: req.payload.userId, // Assign the user's ID to the 'shopper' field
  });

  product.save()
    .then((createdProduct) => {
      // Update the user with the created product's ID
      User.findByIdAndUpdate(
        req.payload.userId,
        { $push: { products: createdProduct._id } },
        { new: true }
      )
        .then(() => {
          res.status(201).json({ product: createdProduct });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
}); 

// GET /products - Retrieves all products from the database
router.get("/", (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json({ products: products });
    })
    .catch((err) => next(err));
});

// GET /products/:id - Retrieves a specific product by ID
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  Product.findById(id)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Product not found." });
        return;
      }

      res.status(200).json({ product: product });
    })
    .catch((err) => next(err));
});

// PUT /products/:id - Updates a specific product by ID
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  if (name === "" || description === "" || price === "" || quantity === "") {
    res.status(400).json({ message: "Provide name, description, price, and quantity" });
    return;
  }

  Product.findByIdAndUpdate(
    id,
    { name, description, price, quantity },
    { new: true }
  )
    .then((updatedProduct) => {
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found." });
        return;
      }

      res.status(200).json({ product: updatedProduct });
    })
    .catch((err) => next(err));
});

// DELETE /products/:id - Deletes a specific product by ID
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  Product.findByIdAndRemove(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found." });
        return;
      }

      res.status(200).json({ message: "Product deleted successfully." });
    })
    .catch((err) => next(err));
});

module.exports = router;
