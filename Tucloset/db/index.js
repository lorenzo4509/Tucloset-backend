const mongoose = require("mongoose");
const uri = "mongodb+srv://lorenzorjhdez:mxPFFs8H3ZiVBPjn@tucloset.acfahod.mongodb.net/?retryWrites=true&w=majority";


const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Tucloset";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};


module.exports = connectDB;
