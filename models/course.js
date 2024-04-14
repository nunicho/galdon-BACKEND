const mongoose = require("mongoose")

const CourseSchema = mongoose.Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    precio: Number,
    score: Number
})

module.exports = mongoose.model("Course", CourseSchema)