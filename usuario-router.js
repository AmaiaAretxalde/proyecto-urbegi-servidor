const router = require('express').Router();
const User = require('./models/User');
const Tea = require('./models/Tea');

//REGISTRO DE gustos de NUEVOS USUARIOS:
router.post('/registro/sabores', function (req, res) {
    const user = req.user;
    let sabores = req.body.sabores;
    let email = req.body.email;
    User.findOneAndUpdate({ email: email }, { $set: { sabores: sabores } }, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos === null || datos.length === 0) {
            res.send({ mensaje: 'Para personalizar tu experiencia debes estar registrado' });
        } else {
            res.send({ mensaje: 'La valoración de los sabores se han registrado correctamente' });
        }
    });
});

//OBTENER PUNTUACION SABORES DE USUARIO logueado:
router.get('/sabores', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        const user = req.user;
        let sabores = user.sabores;
        console.log(sabores)
        res.send({ mensaje: 'Puntación de sabores enviada', respuesta: sabores });
    }
});

//OBTENER DATOS DE OTROS USUARIOS:
router.get('/datos/resto', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
    const user = req.user;
    const email = user.email;
    User.find(function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        } else {
            let posicion = datos.findIndex(function (element) {
                console.log(element.email)
                console.log(email)
                return element.email === email;
            })
            datos.splice(posicion, 1);
            res.send({ mensaje: 'Datos de resto de usuarios enviada', respuesta: datos });
        }}
    
    )}
});

//OBTENER PUNTUACION FUNCIONES DE USUARIO logueado:
router.get('/funciones', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {
        const user = req.user;
        let funciones = user.funciones;
        console.log(funciones)
        res.send({ mensaje: 'Puntación de funciones enviada', respuesta: funciones });
    }
});

//ENCONTRAR PEDIDOS DE AMIGO:
router.post('/recomendaciones', function (req, res) {
    let emailAmigo = req.body.email;
    User.find({ email: emailAmigo }, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos === null || datos.length === 0) {
            res.send({ mensaje: 'No se han encontrado datos de ese usuario' });
        } else {
            res.send({ mensaje: 'Se ha encontrado al usuario amigo', pedidos:datos[0].pedidos });
        }
    });
});

//REGISTRO DE funciones de NUEVOS USUARIOS:
router.post('/registro/funciones', function (req, res) {

    let funciones = req.body.funciones;
    let email = req.body.email;
    User.findOneAndUpdate({ email: email }, { $set: { funciones: funciones } }, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos === null || datos.length === 0) {
            res.send({ mensaje: 'Para personalizar tu experiencia debes estar registrado' });
        } else {
            res.send({ mensaje: 'Tus funciones preferidas se han registrado correctamente' });
        }
    });
});

// router.post('/recomendaciones', function (req, res) {
//     let sabores = req.body.sabores;
//     let funciones = req.body.funciones;
//     let email = req.body.email;
//     Tea.find({ sabores: email }, function (err, datos) {
//         if (err !== null) {
//             res.send({ mensaje: '404' });
//             return;
//         }
//         if ( datos===null || datos.length === 0) {
//             res.send({ mensaje: 'No estás registrado' });
//         } else {

//             res.send(datos );
//         }
//     });
// });



module.exports = router;