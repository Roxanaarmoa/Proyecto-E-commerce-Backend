const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        //enumerar opciones validas
        enum: ['admin', 'usuario','premium'],
        default: 'usuario'
    },//para cambio de contraseña :
    resetToken: {
        token: String,
        expire: Date
    }
});

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;