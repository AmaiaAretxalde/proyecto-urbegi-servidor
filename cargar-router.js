const router = require('express').Router();
const Tea = require('./models/Tea');

// OBTENER DATOS PARA NOVEDADES
router.post('/novedades', function (req, res) {
    let palabra1 = new RegExp(req.body.palabra1);
    let palabra2 = new RegExp(req.body.palabra2);

    Tea.find({$or:[{descripcion: /navidad/}, {name:/Christmas/}]}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});

module.exports = router;