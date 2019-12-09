const mongoose = require('mongoose');

const Teas = mongoose.model('Teas', {
    id:String,
    mainImage: String,
    categoria: String,
    descripcion: String,
    name: String,
    longDescription: Array,
    caracteristicas: {
        aroma: { image: String, texto: String },
        sabor: { image: String, texto: String },
        color: { image: String, texto: String }
    },
    stock: Number,
    basePrice: Number });

module.exports = Teas;