// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
const connectDB = require("./db");
connectDB();

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/products.routes");
const cartRoutes = require("./routes/cart.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const userRoutes = require("./routes/user.routes"); // Importar las rutas del usuario

app.use("/api", indexRoutes);
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes); // Agregar las rutas del usuario
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use(
    cors({
      origin: ["http://localhost:3000", process.env.ORIGIN],
    })
  );
  

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
