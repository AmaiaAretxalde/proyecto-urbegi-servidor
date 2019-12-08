const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Tea = require('./models/Tea')
const User = require('./models/User')
const Tipo = require('./models/Tipo')


mongoose.connect('mongodb://localhost:27017/teashop');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
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
        { usernameField: 'email' },
        function (email, password, done) {
            User.find({ email: email }, function (err, usuarios) {
                if (usuarios.length === 0) {
                    return done(null, false);
                }
                const usuario = usuarios[0];
                let result = (bcrypt.compareSync(password, usuario.password));
                if (result) {
                    return done(null, usuario);
                } else {
                    return done(null, false);
                };
            })
        }));

passport.serializeUser(function (usuario, done) {
    done(null, usuario.email);
});

passport.deserializeUser(function (id, done) {
    User.find({ email: id }, function (err, usuarios) {
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
    let apellido = req.body.apellido;
    let email = req.body.email;
    let direccion = req.body.direccion;
    let localidad = req.body.localidad;
    let provincia = req.body.provincia;
    let cp = req.body.cp;
    let telefono = req.body.telefono;
    let user = new User({ nombre: nombre, apellido: apellido, email: email, direccion: direccion, localidad: localidad, provincia: provincia, cp: cp, telefono: telefono, password: cifrado });
    User.find({ email: email }, function (err, datos) {
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

app.get('/api/usuario/fail', function (req, res) {
    res.send({ mensaje: 'denegado' })
});

app.get('/api/usuario', function (req, res) {
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'denegado' });
    }
    res.send({ mensaje: 'acceso correcto' });
});

//OBTENER NOMBRE USUARIO LOGUEADO:
app.post('/api/usuario/nombre', function (req, res) {
    let email = req.body.email;
    // let nombre='';
    User.find({ email: email }, function (err, datos) {
        if (err !== null) {
            res.send({ mensaje: '404' });
            return;
        }
        if (datos.length !== 0) {
            res.send({ email: email, nombre: datos[0].nombre });
        }
    });
});

const cargarRouter = require('./cargar-router');
const usuarioRouter = require('./usuario-router');

app.use('/api/cargar', cargarRouter);
app.use('/api/usuario', usuarioRouter);

//LOGOUT
app.get('/api/logout', function (req, res) {
    req.logout();
    res.send({ mensaje: 'desconectado' });
});


const adminRouter = require('./admin-router');

app.use('/api/admin', adminRouter);



// VER CESTA 
app.get('/api/cesta',function (req, res) {
    let email = req.body.email
/*const user = req.user
    if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    }*/
    User.find({ email:email }, function (err, usuario) {
        if (err !== null) {
            console.log(err);
            return;
        }
        res.send(usuario[0].cesta);
    });
});

// PARA AÑADIR A LA CESTA
app.post('/api/cesta', async function (req, res) {
    let email = req.body.email;
    let producto = req.body.producto;
    
    /*if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {*/
       await User.findOneAndUpdate({ email:email }, {cesta:{producto}});
        res.send({mensaje:'añadido a la cesta', producto: producto});
    }
);

app.get('/api/cesta', async function (req, res) {
    let email = req.body.email


    /*if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    }*/

    const user = req.user;
    await User.findOne({ email: email }, function (err, usuario) {
        if (err !== null) {
            console.log(err);
            return;
        }
        res.send(user);
    });
});

app.post('/api/cesta', async function (req, res) {
    let email = req.body.email;
    let producto = req.body.producto;

    /*if (req.isAuthenticated() === false) {
        return res.send({ mensaje: 'No estás logueado', logged: false });
    } else {*/
    await User.findOneAndUpdate({ email: email }, { cesta: { producto } });
    res.send({ mensaje: 'añadido a la cesta', producto: producto });
}
);




app.listen(3001, function () {
    console.log('servidor en marcha');
});