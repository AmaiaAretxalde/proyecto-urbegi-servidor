const mongoose = require('mongoose');

const Teas = mongoose.model('Teas', {
    mainImage: String,
    categoria: String,
    descripcion: String,
    name: String,
    longDescription: Array,
    caracteristicas: {
        Aroma: { image: String, texto: String },
        Sabor: { image: String, texto: String },
        Color: { image: String, texto: String }
    },
    stock: Number,
    basePrice: Number });

module.exports = Teas;