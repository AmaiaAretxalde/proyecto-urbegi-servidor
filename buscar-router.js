const router = require('express').Router();
const Tea = require('./models/Tea');
const Tipo = require('./models/Tipo');
const User = require('./models/User');

//BUSCAR TE
router.post('/', function(req,res){
    let buscarTe = req.body.buscarTe;
    let busquedaTe = new RegExp(buscarTe);
    Tea.find({$text:{$search:busquedaTe}}, function (err, datos) {
        if (err !== null) {
            console.log(err)
            res.send({ mensaje: '404' });
            return;
        } else {
            res.send(datos)
        }
    })
    //$or:[{descripcion:buscarTe}, {name:buscarTe}, {longDescription:buscarTe}]}
})

module.exports = router;