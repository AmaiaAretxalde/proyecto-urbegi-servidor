const mongoose = require('mongoose');

const TeasSchema = new mongoose.Schema({
    id: String,
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
    unidadesVendidas: Number,
    stock: Number,
    basePrice: Number,
})
TeasSchema.index({ descripcion: "text", longDescription: "text", name: "text" })

const Teas = mongoose.model('Teas', TeasSchema);
module.exports = Teas;