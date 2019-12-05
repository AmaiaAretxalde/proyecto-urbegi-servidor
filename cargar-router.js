const router = require('express').Router();
const Tea = require('./models/Tea');
const Tipo = require('./models/Tipo');

// OBTENER DATOS PARA NOVEDADES
router.post('/novedades', function (req, res) {
    let palabra1 = new RegExp(req.body.palabra1);
    let palabra2 = new RegExp(req.body.palabra2);

    Tea.find({$or:[{descripcion:palabra1}, {name:palabra2}]}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});

// OBTENER DATOS DE PRODUCTOS POR TIPO DE TÉ
router.get('/:color', function (req, res) {
    let color = new RegExp(req.params.color);
    console.log(color)
    
    Tea.find({$or:[{descripcion:color}, {name:color}]}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});

// OBTENER DATOS POR TIPO DE TÉ
router.get('/info/:tipo', function (req, res) {
    let tipo = new RegExp(req.params.tipo);
    console.log(tipo)
    
    Tipo.find({nombre:tipo}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});



module.exports = router;