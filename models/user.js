const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    fistname: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean,
    avatar: String,  
})

module.exports = mongoose.model("User", UserSchema)