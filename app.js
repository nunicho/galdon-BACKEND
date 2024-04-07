const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const {API_VERSION} = require("./constants")

const app = express();

// Import routings
//...

// Configure Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Configure static folder
app.use(express.static("uploads"))

//Configure Header HTTP - CORS
app.use(cors())

//Configure routing
//...

module.exports = app