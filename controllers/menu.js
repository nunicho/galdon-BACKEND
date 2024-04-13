const menu = require("../models/menu")
const Menu = require("../models/menu")

async function createMenu(req, res) {
  const newMenu = new Menu(req.body);

  try {
    const menuStored = await newMenu.save();
    res.status(200).send(menuStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el menú" });
  }
}

async function getMenus(req, res){
    const { active } = req.query;

    let response = null;
    if (active === undefined) {
      response = await Menu.find().sort({order: "asc"});
    } else {
      response = await Menu.find({ active }).sort({ order: "asc" });
    }
    if(!response){
        res.status(400).send({msg:"No se ha encontrado ningún menú"})
    }else{
        res.status(200).send(response)
    }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const menuData = req.body;

  try {
    await Menu.findByIdAndUpdate(id, menuData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el menú" });
  }
}

async function deleteMenu(req, res){
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.status(200).send({ msg: "Menu eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el menu" }); // NOTA PERSONAL: 3
  }
}
module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
}