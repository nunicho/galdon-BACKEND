const express = require("express")
const AuthController = require("../controllers/auth.js")

const api = express.Router() // COMENTARIO: Yo aquí pondría const router, estoy acostumbrado a usarlo así.

api.post("/auth/register", AuthController.register)
api.post("/auth/login", AuthController.login)
api.post("/auth/refresh_access_token", AuthController.refreshAccessToken)


module.exports = api