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

async function getCourse(req, res) {
  try {
    const {page = 1, limit =10} = req.query
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const coursesStored = await Course.paginate({}, options);
    res.status(200).send(coursesStored);
  } catch (error) {
    res.status(400).send({ msg: "Error al obtener los cursos" });
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const courseData = req.body;

    if (req.files.miniature) {
      const imagePath = image.getFilePath(req.files.miniature);
      courseData.miniature = imagePath;
    }

    await Course.findByIdAndUpdate(id, courseData);
    res.status(200).send({ msg: "Actualización correcta" });
  } catch (error) {
    res.status(400).send({ msg: "Error al actualizar el curso" });
  }
}
async function deleteCourse(req, res) {
  const { id } = req.params;
  try {
    await Course.findByIdAndDelete(id);
    res.status(200).send({ msg: "Curso eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el curso" }); // NOTA PERSONAL: 3
  }
}

module.exports = {
    createCourse,
    getCourse,
    updateCourse,
    deleteCourse
}