const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require('./config/database');


// get enviroment variables
require('dotenv').config({path: './config/.env'})
// brings data base
mongoose.set("strictQuery", false);
connectDB()
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('tiny'));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}!`));
