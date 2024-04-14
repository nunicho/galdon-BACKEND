const express = require("express")
const multiparty = require("connect-multiparty")
const CourseController =  require("../controllers/course.js")
const md_auth = require("../middlewares/authenticated.js")

const md_upload = multiparty({ uploadDir: "./uploads/course" }); // NOTA PERSONAL:4 es un middleware, asi que por qué mandamos a la carpeta de middlewares?
const api = express.Router();

api.post("/course", [md_auth.asureAuth, md_upload], CourseController.createCourse)
api.get("/course", CourseController.getCourse) 
api.patch("/course/:id", [md_auth.asureAuth, md_upload], CourseController.updateCourse);
api.delete("/course/:id", [md_auth.asureAuth], CourseController.deleteCourse);


module.exports = api
