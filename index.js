const mongoose = require("mongoose");
const app = require("./app.js")

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} = require("./constants.js");

const PORT  = process.env.POST || 3977

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mern-galdon`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(PORT, () =>{
        console.log("#######################")
        console.log("######  API REST  #####");
        console.log("#######################");
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
    })
  })
  .catch((error) => {
    console.error("Error de conexión a la base de datos:", error);
  });