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


// OBTENER DATOS DE TODOS LOS TE, CON PAGINACION
router.get('/teas',function(req,res){
    datos={}
    datos.msg="ok"
    let limit=9
    let page=0
    if (req.query.limit){
        limit=parseInt(req.query.limit)
    }
    if (req.query.page){
        page=parseInt(req.query.page)
    }
    Tea.find({}, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    }).limit(limit).skip(page*limit)
})


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

// OBTENER DATOS de PRODUCTO
router.get('/producto/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    
    Tea.find({id:id}, function (err, datos) {
        if ((err !== null) || (datos.length===0)) {
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
});

router.get('/losmasvendidos', function (req, res) {
    Tea.find(function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            console.log(datos)
            res.send({mensaje:'todos los tés enviados', datos:datos})
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

module.exports = router;