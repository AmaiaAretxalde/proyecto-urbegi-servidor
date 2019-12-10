const router = require('express').Router();
const Tea = require('./models/Tea');
const Tipo = require('./models/Tipo');
const User = require('./models/User');

// PARA AÑADIR A LA CESTA
router.post('/', async function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        let producto = req.body.producto;
        let id = producto.id;
        let unidades = req.body.unidades;
        let cestaExistente = req.user.cesta;
        const user = req.user;
        console.log(cestaExistente)
        let posicion = cestaExistente.findIndex(function (element) {
            console.log(element.producto.id)
            console.log(id)
            return element.producto.id === id;
        });
        if(posicion===undefined || posicion===(-1)){
            cestaExistente.push({producto, unidades});
            user.markModified('cesta');
            user.save();
            res.send({ mensaje: 'añadido a la cesta', logged: true, cestaExistente });
        }else{
            cestaExistente[posicion].unidades += unidades;
            user.markModified('cesta');
            user.save();
            res.send({ mensaje: 'añadido a la cesta', logged: true, cestaExistente });
        };
        }
    }
);


//ELIMINAR DE CESTA
router.delete('/:id', async function (req, res) {
    let id = req.params.id;
    const user = req.user;
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        let userDocument = await User.findById(user._id);
        userDocument.cesta = userDocument.cesta.filter(function (element) {
            return element._id !== id;
        });
        userDocument.save();
        res.send({ mensaje: 'eliminado', cesta });
    }
});

// VER CESTA 
router.get('/', function (req, res) {
    let email = req.body.email
    const user = req.user
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        User.find({ email: user.email }, function (err, usuario) {
            if (err !== null) {
                console.log(err);
                return;
            }
            res.send(usuario[0].cesta);
        })
    };
});




module.exports = router;