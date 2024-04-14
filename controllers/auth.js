const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const jwt = require("../utils/jwt.js");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria " });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password,
    role: "user",
    active: "false",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user
    .save()
    .then((userStorage) => {
      res.status(200).send(userStorage);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el usuario." });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStore) => {
      if (!userStore) {
        res.status(400).send({ msg: "Contraseña o email incorrectos" });
      } else {
        bcrypt.compare(password, userStore.password, (bcryptError, check) => {
          if (bcryptError) {
            res.status(500).send({ msg: "Error del servidor" });
          } else if (!check) {
            res.status(400).send({ msg: "Contraseña o email incorrectos" });
          } else if (!userStore.active) {
            res.status(401).send({ msg: "Usuario no autorizado o no activo" });
          } else {
            res.status(200).send({
              access: jwt.createAccessToken(userStore),
              refresh: jwt.createRefreshToken(userStore),
            });
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error del servidor:", error);
      res.status(500).send({ msg: "Error del servidor" });
    });
}

async function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) {
    res.status(400).send({ msg: "Token requerido" });
    return;
  }

  try {
    const { user_id } = jwt.decoded(token);
    const userStorage = await User.findOne({ _id: user_id });

    if (!userStorage) {
      res.status(404).send({ msg: "Usuario no encontrado" });
      return;
    }

    res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};

/*
function refreshAccessToken(req,res){
    const {token} = req.body

    if(!token) res.status(400).send({msg: "Token requerido"})

    const {user_id} = jwt.decoded(token)
    User.findOne({ _id: user_id }, (error, userStorage)=>{
        if(error){
            res.status(500).send({msg:"Error del servidor"})
        }else{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage)
            })
        }
    });
}
*/

/*
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const jwt = require("../utils/jwt.js");

function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria " });

  const user = new User({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password,
    role: "user",
    active: "false",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  user
    .save()
    .then((userStorage) => {
      res.status(200).send(userStorage);
    })
    .catch((error) => {
      res.status(400).send({ msg: "Error al crear el usuario." });
    });
}

function login(req, res) {
  const { email, password } = req.body;
  if (!email) res.status(400).send({ msg: "El email es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const emailLowerCase = email.toLowerCase();

  User.findOne({ email: emailLowerCase })
    .then((userStore) => {
      if (!userStore) {
        res.status(400).send({ msg: "Contraseña o email incorrectos" });
      } else {
        bcrypt.compare(password, userStore.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg: "Error del servidor"})
            }else if(!check){
                res.status(400).send({msg: "Contraseña o email incorrectos"})
            }else if(!userStore.active){
                res.status(401).send({msg: "Usuario no autorizado o no activo"})
            }else{
                res.status(200).send({
                    access:jwt.createAccessToken(userStore),
                    refresh: jwt.createRefreshToken(userStore)
                })
            }
        })
      }
    })
    .catch((error) => {
      console.error("Error del servidor:", error);
      res.status(500).send({ msg: "Error del servidor" });
    });

}

async function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) {
    res.status(400).send({ msg: "Token requerido" });
    return;
  }

  try {
    const { user_id } = jwt.decoded(token);
    const userStorage = await User.findOne({ _id: user_id });

    if (!userStorage) {
      res.status(404).send({ msg: "Usuario no encontrado" });
      return;
    }

    res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}


module.exports = {
  register,
  login,
  refreshAccessToken
};

*/
