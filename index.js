require('dotenv').config()

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Tea = require('./models/Tea');
const User = require('./models/User');
const Tipo = require('./models/Tipo');


let password = process.env.PASSWORD;
console.log(`el password es ${password}`)

mongoose.connect(`mongodb+srv://amaiaaretxalde:${password}@cluster0-ojbh1.mongodb.net/teashop?retryWrites=true&w=majority`);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const session = require('express-session');
app.use(session({
    secret: 'jlasjdhkiusgvd',
    resave: false,
    saveUninitialized: false
}));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy({ usernameField: 'email' },
        function(email, password, done) {
            User.find({ email: email }, function(err, usuarios) {
                if (usuarios.length === 0) {
                    return done(null, false);
                }
                const usuario = usuarios[0];
                let result = (bcrypt.compareSync(password, usuario.password));
                if (result) {
                    console.log(`login de ${usuario}`)
                    return done(null, usuario);
                } else {
                    console.log(`fallo en el login de ${usuario}`)

                    return done(null, false);
                };
            })
        }));

passport.serializeUser(function(usuario, done) {
    done(null, usuario.email);
});

passport.deserializeUser(function(id, done) {
    User.find({ email: id }, function(err, usuarios) {
        if (usuarios.length === 0) {
            done(null, null);
        }
        done(null, usuarios[0]);
    });
});


//REGISTRO DE NUEVOS USUARIOS:
app.post('/api/usuario/registro', function(req, res) {

    let cifrado = bcrypt.hashSync(req.body.password, 10);
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let email = req.body.email;
    let direccion = req.body.direccion;
    let localidad = req.body.localidad;
    let provincia = req.body.provincia;
    let cp = req.body.cp;
    let telefono = req.body.telefono;
    let user = new User({ nombre: nombre, apellido: apellido, email: email, direccion: direccion, localidad: localidad, provincia: provincia, cp: cp, telefono: telefono, password: cifrado, isAdmin: false });
    User.find({ email: email }, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos.length !== 0) {
            res.send({ mensaje: 'Error en el registro. Email ' + email + ' ya registrado. Elija otro, por favor.' });
        } else {
            user.save();
            res.send({ user: user, mensaje: 'Usuario registrado correctamente' });
        }
    });
});




//COMPROBAR DATOS DE ACCESO PARA USUARIOS YA REGISTRADOS:
app.post('/api/usuario/login', passport.authenticate('local', {
    successRedirect: '/api/usuario',
    failureRedirect: '/api/usuario/fail'
}));

app.get('/api/usuario/fail', function(req, res) {
    res.send({ mensaje: 'denegado' })
});

app.get('/api/usuario', function(req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'denegado' });
    }
    res.send({ mensaje: 'acceso correcto' });
});

//OBTENER NOMBRE USUARIO LOGUEADO:
app.post('/api/usuario/nombre', function(req, res) {
    let email = req.body.email;
    // let nombre='';
    User.find({ email: email }, function(err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos.length !== 0) {
            res.send({ email: email, nombre: datos[0].nombre, isAdmin: datos[0].isAdmin });
        }
    });
});

const cargarRouter = require('./cargar-router');
const usuarioRouter = require('./usuario-router');
const adminRouter = require('./admin-router');
const cestaRouter = require('./cesta-router');
const buscarRouter = require('./buscar-router');


app.use('/api/cargar', cargarRouter);
app.use('/api/usuario', usuarioRouter);
app.use('/api/admin', adminRouter);
app.use('/api/cesta', cestaRouter);
app.use('/api/buscar', buscarRouter);


//LOGOUT
app.get('/api/logout', function(req, res) {
    req.logout();
    res.send({ mensaje: 'desconectado' });
});



app.listen(3001, function() {
    console.log('servidor en marcha');
});