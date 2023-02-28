const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const cloudinary = require("cloudinary").v2;

//  routes
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes");
const storeRoutes = require("./routes/storeRoutes");
const cartRoutes = require("./routes/cartRoutes");



// Get enviroment variables
require("dotenv").config({ path: "./config/.env" });
// Brings data base
mongoose.set("strictQuery", false);
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// To protect API
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(morgan("tiny"));

app.use("/api", userRoutes)
app.use("/product", productRoutes)
app.use("/store", storeRoutes)
app.use("/cart", cartRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
