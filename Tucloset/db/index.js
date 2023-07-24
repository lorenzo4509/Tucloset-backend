// Importa el paquete dotenv al principio del archivo
require('dotenv').config();

const mongoose = require("mongoose");

// Usa la variable de entorno MONGODB_URI para obtener la cadena de conexión
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Tucloset";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB: "${mongoose.connection.name}"`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
