const router = require('express').Router();
const User = require('./models/User');

//REGISTRO DE gustos de NUEVOS USUARIOS:
app.post('/registro/gustos', function (req, res) {

    let sabores = req.body.sabores;
    let funciones = req.body.funciones;
    let email = req.body.email;
    User.findOneAndUpdate({ email: email }, { $set: { sabores: sabores , funciones:funciones}}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos.length === 0) {
            res.send({ mensaje: 'Para personalizar tu experiencia debes estar registrado' });
        } else {
            user.save();
            res.send({ mensaje: 'Usuario registrado correctamente' });
        }
    });
});

module.exports = router;