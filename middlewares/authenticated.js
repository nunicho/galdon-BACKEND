const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
    const payload = jwt.decoded(token);

    const { exp } = payload;
    const currentData = new Date().getTime();
   
    if (exp <= currentData) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

module.exports = {
  asureAuth,
};

/*
const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: "La petición no tiene la cabecera de autenticación" });
    }

    const token = req.headers.authorization.replace("Bearer ", "");

    try {
        const payload = jwt.verify(token, "tu_secreto"); // Reemplaza "tu_secreto" con la clave secreta de tu aplicación

        const { exp } = payload;
        console.log(exp);
        const currentData = new Date().getTime();
        console.log(currentData);
        if (exp <= currentData) {
            return res.status(400).send({ msg: "El token ha expirado" });
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(400).send({ msg: "Token Inválido" });
    }
}

module.exports = {
    asureAuth
};
*/
