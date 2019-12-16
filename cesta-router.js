const router = require('express').Router();
const Tea = require('./models/Tea');
const Tipo = require('./models/Tipo');
const User = require('./models/User');
const nodemailer = require('nodemailer');

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
        let mensaje = '';
        for (let i = 0; i < user.cesta.length; i++) {
            mensaje += `<p>Producto: ${user.cesta[i].producto.name}</p>
                     <p>Unidades: ${user.cesta[i].unidades}</p> 
                     <p>Precio ${user.cesta[i].producto.basePrice}€/ud</p>
                     <hr>`;
        }
        user.markModified('pedidos');
        await user.save();
        enviarMail(user.nombre, mensaje);
        for (let i = 0; i < user.cesta.length; i++) {
            gestionarStock(user.cesta[i].producto.name, user.cesta[i].unidades)
        }
        user.cesta = [];
        user.markModified('cesta');
        await user.save();
        console.log(mensaje)
        res.send({ mensaje: 'pedido realizado', logged: true, respuesta: user.pedidos });
    }
});

//MANDAR MAIL CUANDO SE HACE PEDIDO
function enviarMail(nombre, pedido) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ureproyectofinal@gmail.com',
            pass: 'ureproyecto'
        }
    });

    let mailOptions = {
        from: 'ureproyectofinal@gmail.com',
        to: 'aaretxalde@gmail.com',
        subject: 'Confirmación de pedido',
        text: 'Tu pedido se ha procesado correctamente',
        html: `<h2>${nombre}, tu pedido en Ure se ha procesado correctamente</h2>
        <h3>Tu pedido incluye:</h3>
        <p>${pedido}</p>
        <p>Plazo de entrega: 2-3 días laborables</p>`,

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);

        } else {
            console.log('Email sent: ' + info.response);

        }
    });
}

//GESTIONAR STOCK
function gestionarStock(producto, unidades) {
    Tea.find({ name: producto }, function (err, datos) {
        if (err !== null) {
            console.log({ mensaje: '404' });
            return;
        }
        if (datos === null || datos.length === 0) {
            console.log({ mensaje: 'No se ha encontrado ese producto' });
            return;
        } else {
            let nuevoStock = datos[0].stock - unidades;
            console.log(nuevoStock)
            Tea.findOneAndUpdate({ name: producto }, { stock: nuevoStock }, function (err, datos) {
                if (err !== null) {
                    console.log({ mensaje: '404' });
                    return;
                }
                if (datos === null || datos.length === 0) {
                    console.log({ mensaje: 'No se ha encontrado el producto' });
                    return;
                } else {
                    console.log({ mensaje: 'Se ha modificado las unidades de stock del producto seleccionado' });
                    return;
                }
            });
        };
    });
}

module.exports = router;