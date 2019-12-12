const mongoose = require('mongoose');
const User = require('./models/User');


mongoose.connect('mongodb://localhost:27017/teashop');

User.find({}, (err, datos) => {
    datos.forEach(usuario => {
        console.log("-------------------")
        console.log(`nombre ${usuario.nombre}`)
        console.log(`sabores ${usuario.sabores}`)
        console.log(`funciones: ${usuario.funciones}`)
        console.log(`pedidos:${usuario.pedidos}`)
    })
    process.exit(0)
})