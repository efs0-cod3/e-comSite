const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/database");
const bodyParser = require("body-parser");

// get enviroment variables
require("dotenv").config({ path: "./config/.env" });
// brings data base
mongoose.set("strictQuery", false);
connectDB();

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());

//  to protect API
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
