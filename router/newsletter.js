const express = require("express");
const Newslettercontroller = require("../controllers/newsletter.js");
const md_auth = require("../middlewares/authenticated.js");

const api = express.Router();

api.post("/newsletter", Newslettercontroller.suscribeEmail);
api.get("/newsletter", [md_auth.asureAuth], Newslettercontroller.getEmails);
api.delete(
  "/newsletter/:id",
  [md_auth.asureAuth],
  Newslettercontroller.deleteEmail
); //NOTA PERSONAL 6

module.exports = api;
