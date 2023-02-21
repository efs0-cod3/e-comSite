const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
// const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes")
// Get enviroment variables
require("dotenv").config({ path: "./config/.env" });
// Brings data base
mongoose.set("strictQuery", false);
connectDB();

// Body Parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.json());

// To protect API
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => 
res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
);
app.use("/api", userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
