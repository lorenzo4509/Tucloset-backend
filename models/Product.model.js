const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required."],
    },
    shopper: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required for the product."],
    },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
