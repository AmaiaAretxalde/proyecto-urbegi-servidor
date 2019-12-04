const router = require('express').Router();
const User = require('./models/User');

//REGISTRO DE gustos de NUEVOS USUARIOS:
router.post('/registro/gustos', function (req, res) {

    let sabores = req.body.sabores;
    let funciones = req.body.funciones;
    let email = req.body.email;
    User.findOneAndUpdate({ email: email }, { $set: { sabores: sabores , funciones:funciones}}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if ( datos===null || datos.length === 0) {
            res.send({ mensaje: 'Para personalizar tu experiencia debes estar registrado' });
        } else {
            res.send({ mensaje: 'Tus gustos se han registrado correctamente' });
        }
    });
});

module.exports = router;