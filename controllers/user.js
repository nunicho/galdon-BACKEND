const bcrypt = require("bcryptjs");
const User = require("../models/user.js");
const image = require("../utils/image.js")

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;

  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const { password } = req.body;
  const user = new User({ ...req.body, active: false });
  
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  if (req.files.avatar) {
    const imagePath = image.getFilePath(req.files.avatar)
    user.avatar = imagePath
  }

  try {
    const userStored = await user.save();
    res.status(201).send(userStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el usuario" });
  }
}


async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if(userData.password){
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword
  }else{
    delete userData.password
  }

  if(req.files.avatar){
    const imagePath = image.getFilePath(req.files.avatar)
    userData.avatar = imagePath
  }

  try {
    await User.findByIdAndUpdate(id, userData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el usuario" });
  }

}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).send({ msg: "Usuario eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el usuario" });  // NOTA PERSONAL: 3 
  }
}


module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
