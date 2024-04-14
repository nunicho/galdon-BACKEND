const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { API_VERSION } = require("./constants");

const app = express();

// Import routings
const authRoutes = require("./router/auth.js");
const userRoutes = require("./router/user.js");
const menuRoutes = require("./router/menu.js")
const courseRoutes = require("./router/course.js")

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));

//Configure Header HTTP - CORS
app.use(cors());

//Configure routing
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);
app.use(`/api/${API_VERSION}`, courseRoutes);

module.exports = app;
