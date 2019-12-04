const router = require('express').Router();
const Tea = require('./models/Tea');

// OBTENER DATOS PARA NOVEDADES
router.post('/novedades', function (req, res) {
    let palabra1 = new RegExp(req.body.palabra1);
    let palabra2 = new RegExp(req.body.palabra2);

    Tea.find({$or:[{descripcion: /palabra1/}, {name:/palabra2/}]}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});

// OBTENER DATOS POR TIPO DE TÉ
router.get('/:color', function (req, res) {
    let color = new RegExp(req.params.color);
    console.log(color)
    
    Tea.find({categoria:/color/}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});



module.exports = router;