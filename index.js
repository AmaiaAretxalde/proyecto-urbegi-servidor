const express = require('express');
const app = express();
const getDb = require('./getDb');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/teas');


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


const session = require('express-session');
app.use(session(
    {
        secret: 'jlasjdhkiusgvd',
        resave: false,
        saveUninitialized: false
    }
));

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require('passport-local').Strategy;

passport.use(
    new LocalStrategy(
        { usernameField: 'nombreUsuario' },
        function (nombreUsuario, password, done) {
            let db = getDb();
            db.collection('usuarios').find({ nombreUsuario: nombreUsuario }).toArray(function (err, usuarios) {
                if (usuarios.length === 0) {
                    return done(null, false);
                }
                const usuario = usuarios[0];
                console.log(password)
                console.log(usuario.password)
                let result=(bcrypt.compareSync(password, usuario.password));
                if(result) {
                // if (password, usuario.password) {
                    return done(null, usuario);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

passport.serializeUser(function (usuario, done) {
    done(null, usuario.nombreUsuario);
});

passport.deserializeUser(function (id, done) {
    let db = getDb();
    db.collection('usuarios').find({ nombreUsuario: id }).toArray(function (err, usuarios) {
        if (usuarios.length === 0) {
            done(null, null);
        }
        done(null, usuarios[0]);
    });
});


//REGISTRO DE NUEVOS USUARIOS:
app.post('/api/usuario/registro', function (req, res) {

    let cifrado = bcrypt.hashSync(req.body.password, 10);
    let nombre = req.body.nombre;
    let email = req.body.email;
    let nombreUsuario = req.body.nombreUsuario;
    // let password = req.body.password;
    let db = getDb();
    db.collection('usuarios').find({ nombreUsuario: nombreUsuario}).toArray(function (err, datos) {
        if (err !== null) {
            res.send(err);
            return;
        }
        if (datos.length !== 0) {
            res.send({mensaje:'Error en el registro. Nombre de usuario ' + nombreUsuario + ' ya registrado. Elija otro, por favor.'});
        }
        else {
            db.collection('usuarios').insertOne({nombre:nombre, email:email, nombreUsuario:nombreUsuario, password:cifrado });
            res.send({mensaje:'Usuario registrado correctamente'});
        }
    })
});

//COMPROBAR DATOS DE ACCESO PARA USUARIOS YA REGISTRADOS:
app.post('/api/usuario/login', passport.authenticate('local', {
    successRedirect: '/api/usuario',
    failureRedirect: '/api/usuario/fail'
}));

app.get('/api/usuario/fail', function(req, res) {
    res.send({mensaje: 'denegado'})
});

app.get('/api/usuario', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({mensaje: 'denegado'});
    }
    res.send({mensaje: 'acceso correcto'});
});


//LOGOUT
app.get("/api/logout", function(req, res) {
    req.logout();
    res.send({mensaje: 'desconectado'});
  });

app.listen(3001, function(){
    console.log('servidor en marcha');
});