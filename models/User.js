const mongoose = require('mongoose');


const User = mongoose.model('User', {
    nombre: String,
    apellido: String,
    email: String,
    direccion: String,
    localidad: String,
    provincia: String,
    cp: String,
    telefono: String,
    password: String,
    sabores: [{
        nombre: String,
        puntuacion: Number,
    }],
    funciones: [{
        nombre: String,
        puntuacion: Number,
    }],
    cesta: Array,
    pedidos: Array,
    isAdmin: Boolean,

});

module.exports = User;