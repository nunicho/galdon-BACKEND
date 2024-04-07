const mongoose = require("mongoose");
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants.js");

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/MERN-Web-Personal`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("La conexión con la base de datos ha sido exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });