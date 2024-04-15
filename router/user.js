const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user.js");
const md_auth = require("../middlewares/authenticated.js");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" }); // NOTA PERSONAL:4 es un middleware, asi que por qué mandamos a la carpeta de middlewares?
const api = express.Router();

api.get("/user/me", [md_auth.asureAuth], UserController.getMe); // NOTA PERSONAL: 2
api.get("/users", [md_auth.asureAuth], UserController.getUsers);
api.post("/user", [md_auth.asureAuth, md_upload], UserController.createUser);
api.patch(
  "/user/:id",
  [md_auth.asureAuth, md_upload],
  UserController.updateUser
); //Se usa patch porque es una actualización parcial
api.delete("/user/:id", [md_auth.asureAuth], UserController.deleteUser); //NOTA PERSONAL 6


module.exports = api;
