const mongoose = require('mongoose');

const Tipo = mongoose.model('Tipo', {
    nombre: String,
    foto: String,
    descripcion: String,
    modoPreparacion: Array,
    beneficios: Array
});
   
module.exports = Tipo;