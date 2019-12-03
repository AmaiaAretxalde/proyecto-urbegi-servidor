const mongoose = require('mongoose');

const Teas = mongoose.model('Teas', { id: String, name: String, basePrice: Number, funcionalidad: String, descripcion: String, stock: Number, sabor: String, aroma: String, image: String });

module.exports = Teas;