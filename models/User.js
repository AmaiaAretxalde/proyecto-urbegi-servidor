const mongoose = require('mongoose');


const User = mongoose.model('User',
    {
        nombre: String,
        apellido: String,
        email: String,
        direccion: String,
        localidad: String,
        provincia: String,
        cp: String,
        telefono: String,
        password: String,
        sabores: Array,
        funciones: Array
    });

module.exports = User;