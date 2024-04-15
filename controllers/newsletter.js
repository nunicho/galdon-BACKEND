const Newsletter = require("../models/newsletter.js")

async function suscribeEmail(req, res) {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).send({ msg: "Email obligatorio" }); // NOTA PERSONAL: 7

    const existingNewsletter = await Newsletter.findOne({
      email: email.toLowerCase(),
    });

    if (existingNewsletter) {
      return res.status(400).send({ msg: "El email ya está registrado" });
    }

    const newsletter = new Newsletter({ email: email.toLowerCase() });
    await newsletter.save();
    res.status(200).send({ msg: "Email registrado" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Ha ocurrido un error al procesar la solicitud" });
  }
}

async function getEmails(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const emailsStored = await Newsletter.paginate({}, options);
    res.status(200).send(emailsStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los emails" });
  }
}

async function deleteEmail(req, res) {
  const { id } = req.params;
  try {
    await Newsletter.findByIdAndDelete(id);
    res.status(200).send({ msg: "Email eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el email" }); // NOTA PERSONAL: 3
  }
}



module.exports = {
    suscribeEmail,
    getEmails,
    deleteEmail
}