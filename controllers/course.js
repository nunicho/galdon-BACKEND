const Course = require("../models/course.js")
const image = require("../utils/image.js")

async function createCourse(req, res) {
  const course = new Course(req.body);

  try {
    const imagePath = image.getFilePath(req.files.miniature);
    course.miniature = imagePath;

    const courseStored = await course.save();
    res.status(201).send(courseStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al crear el curso" });
  }
}

module.exports = {
    createCourse
}