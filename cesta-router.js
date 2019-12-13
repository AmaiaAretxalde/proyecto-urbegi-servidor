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
        if (posicion === undefined || posicion === (-1)) {
            cestaExistente.push({ producto, unidades });
            user.markModified('cesta');
            user.save();
            res.send({ mensaje: 'añadido a la cesta', logged: true, cestaExistente });
        } else {
            cestaExistente[posicion].unidades += unidades;
            user.markModified('cesta');
            user.save();
            res.send({ mensaje: 'añadido a la cesta', logged: true, cestaExistente });
        };
    }
}
);


//ELIMINAR PRODUCTO DE CESTA
router.delete('/:id', async function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        let id = req.params.id;
        const user = req.user;
        let cestaExistente = user.cesta;
        let posicion = cestaExistente.findIndex(function (element) {
            console.log(element.producto.id)
            console.log(id)
            return element.producto.id === id;
        });
        if (posicion === undefined || posicion === (-1)) {
            res.send({ mensaje: 'este producto no existe en la cesta', logged: true, cestaExistente });
        } else {
            cestaExistente.splice(posicion, 1);
            user.markModified('cesta');
            await user.save();
            res.send({ mensaje: 'producto eliminado de la cesta', logged: true, cestaExistente });
        };
    }
});

//MODIFICAR UNIDADES DE CESTA
router.put('/', async function (req, res) {
    let posicion;
   
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        let id = req.body.id;
        let unidades = req.body.unidades;
        const user = req.user;
        let cestaExistente = user.cesta;
        posicion = cestaExistente.findIndex(function (element) {
            console.log(element.producto.id)
            console.log(id)
            return element.producto.id === id;
            
        });
   
        if (posicion === undefined || posicion === (-1)) {
            res.send({ mensaje: 'este producto no existe en la cesta', logged: true, cestaExistente });
        } else {
            cestaExistente[posicion].unidades += unidades;
            if (cestaExistente[posicion].unidades === 0) {
                cestaExistente.splice(posicion, 1);
            };
            user.markModified('cesta');
            await user.save();
            res.send({ mensaje: 'producto modificado de la cesta', logged: true, cestaExistente });
        }
    }
});


// VER CESTA 
router.get('/', async function (req, res) {

    const user = req.user
    if (req.isAuthenticated() === false) {
        res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
       res.send(user.cesta);
    };
});


//PASAR DE CESTA A PEDIDO
router.get('/pedido', async function (req, res) {
    if (req.isAuthenticated() === false) {
        res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        const user = req.user
        user.pedidos.push(user.cesta);
        user.markModified('pedidos');
        await user.save();
        user.cesta = [];
        user.markModified('cesta');
        await user.save();

        res.send({ mensaje: 'pedido realizado', logged: true, respuesta:user.pedidos });
    }
});

module.exports = router;