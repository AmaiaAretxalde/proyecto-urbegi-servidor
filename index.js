const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Tea = require('./models/Tea')


mongoose.connect('mongodb://localhost:27017/teashop');

const User = mongoose.model('User', { nombre: String, apellido: String, email: String, direccion: String, localidad: String, provincia: String, cp: String, telefono: String, password: String });


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
            res.send({ mensaje: 'Usuario registrado correctamente' });
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
            res.send({ nombre: datos[0].nombre });
        }
    });
});


//LOGOUT
app.get('/api/logout', function (req, res) {
    req.logout();
    res.send({ mensaje: 'desconectado' });
});


const adminRouter = require('./admin-router');

app.use('/api/admin', adminRouter);





let teas = [{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//28011_2-Sweet-Turron-1000x1000_l.jpg",
    "categoria": "Vitamínica",
    "descripcion": "Una navidad cargada de dulzura con el intenso sabor del turrón más clásico.",
    "name": "Infusión Sweet Turron",
    "longDescription": [
        "Una navidad cargada de dulzura con nuestra infusión Sweet Turrón. Deleitará tu paladar y te hará recordar el intenso sabor del turrón más clásico. Una base de manzana mezclada con trocitos de almendra, canela y los aromas más deliciosos del mazapán  Funcionalidad: Vitamínicas  ¡Quiero saber más!: Con Sweet Turrón contemplamos el antiguo secreto de la felicidad: “desear lo que ya tengo, vivir un momento que ya es mío.\\\" Un refrán anónimo que podremos hacer nuestro cuando estemos disfrutando de esta infusión. La bebida dulce y original que pondrá el \\\"toque final” a las comidas navideñas.  Ingredientes: Una navidad cargada de dulzura con el intenso sabor del turrón más clásico: manzana mezclada con almendra, canela y los aromas del mazapán.",
        "Una navidad cargada de dulzura con nuestra infusión Sweet Turrón. Deleitará tu paladar y te hará recordar el intenso sabor del turrón más clásico. Una base de manzana mezclada con trocitos de almendra, canela y los aromas más deliciosos del mazapán",
        "",
        "Funcionalidad: Vitamínicas",
        "",
        "¡Quiero saber más!: Con Sweet Turrón contemplamos el antiguo secreto de la felicidad: “desear lo que ya tengo, vivir un momento que ya es mío.\\\" Un refrán anónimo que podremos hacer nuestro cuando estemos disfrutando de esta infusión. La bebida dulce y original que pondrá el \\\"toque final” a las comidas navideñas.",
        "",
        "Ingredientes: Una navidad cargada de dulzura con el intenso sabor del turrón más clásico: manzana mezclada con almendra, canela y los aromas del mazapán.",
        "",
        "",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Dulce especiado"
        },
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Especiado"
        },
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Rojo"
        }
    }
    ,
    "stock": 235,
    "basePrice": 9.8
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//10142_ChristmasTeaBlack_1000x1000_l.jpg",
    "categoria": "Té negro",
    "descripcion": "Tés negros, almendra tostada, manzana y naranja. 20 años Historia.",
    "name": "Té negro ChristmasTea Black",
    "longDescription": [
        "ChristmasTea Black de la gama de Tés navideños Tea Shop, es una mezcla con más de 20 años de historia y que se sigue elaborando con la misma receta de siempre: una base de tes negros de sabor fuerte y amaderado con un concentrado de ingredientes que nos recuerdan al sabor único del mazapán mezclado con manzana, naranja, almendra tostada y el intenso sabor de las especias de oriente como la canela y el clavo.  Una mezcla de cálido aroma y sabor para los días fríos de invierno. Perfecto con repostería especiada.   INGREDIENTES: Mezcla de dos tés negros, naranja, almendra, canela, manzana, clavo, pétalos de aciano, aroma de almendra, canela, naranja ALÉRGENOS: Contiene frutos secos.  BENEFICIOS: El Té Negro es una buena bebida de carácter “estimulante suave” del sistema nervioso central que contribuye a despejar la mente.  La canela es carminativa; eficaz en caso de cólicos y problemas estomacales. El clavo es eficaz para aliviar náuseas, dolores de estómago y dolores de muela. La fruta nos aporta vitamina C, antioxidantes y fibra además de hidratar el organismo.  Los frutos secos son alimentos muy completos, energéticos y ricos en minerales y nutrientes.  FUNCIONALIDAD: Energizante.",
        "ChristmasTea Black de la gama de Tés navideños Tea Shop, es una mezcla con más de 20 años de historia y que se sigue elaborando con la misma receta de siempre: una base de tes negros de sabor fuerte y amaderado con un concentrado de ingredientes que nos recuerdan al sabor único del mazapán mezclado con manzana, naranja, almendra tostada y el intenso sabor de las especias de oriente como la canela y el clavo. ",
        "Una mezcla de cálido aroma y sabor para los días fríos de invierno. Perfecto con repostería especiada. ",
        "",
        "INGREDIENTES: Mezcla de dos tés negros, naranja, almendra, canela, manzana, clavo, pétalos de aciano, aroma de almendra, canela, naranja",
        "ALÉRGENOS: Contiene frutos secos.",
        "",
        "BENEFICIOS:",
        "El Té Negro es una buena bebida de carácter “estimulante suave” del sistema nervioso central que contribuye a despejar la mente. ",
        "La canela es carminativa; eficaz en caso de cólicos y problemas estomacales.",
        "El clavo es eficaz para aliviar náuseas, dolores de estómago y dolores de muela.",
        "La fruta nos aporta vitamina C, antioxidantes y fibra además de hidratar el organismo. ",
        "Los frutos secos son alimentos muy completos, energéticos y ricos en minerales y nutrientes.",
        "",
        "FUNCIONALIDAD: Energizante.",
        "",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "especiado"
        },
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Mazapán especiado, sabor intenso y astringente"
        },
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Ámbar oscuro"
        }
    },
        "stock": 235,
        "basePrice": 7.949999999997
    
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//11104_ChristmasTeaRed_1000x1000_l-1.jpg",
    "categoria": "Té rojo (Pu Erh)",
    "descripcion": "Té rojo Pu Erh, almendra tostada y canela",
    "name": "Té rojo (Pu Erh) ChristmasTea Red",
    "longDescription": [
        "Christmas Tea Red, de la gama de tés navideños Tea Shop, es una mezcla con más de 20 años de historia que se sigue elaborando con la misma receta de siempre: una base de Té rojo Pu Erh de intenso sabor terroso con un concentrado de ingredientes que nos recuerdan al sabor único del mazapán mezclado con manzana, naranja, almendra tostada y el intenso sabor de las especias de oriente como la canela y el clavo. ",
        "Una mezcla con un bajo contenido de teína y un gran aroma para los fríos días de invierno ",
        "",
        "",
        "INGREDIENTES: Té Pu Erh, almendra, naranja, manzana, canela, clavo, aciano, aromas naturales y de almendra, canela y naranja.",
        "ALÉRGENOS: Contiene frutos secos.",
        "BENEFICIOS:",
        "El Té Rojo favorece a las digestiones, a controlar los niveles de colesterol, triglicéridos y ácido úrico. La canela es carminativa y eficaz en con los problemas estomacales. El clavo es eficaz contra las náuseas, dolores de estómago y muelas. La fruta aporta vitamina C, antioxidantes, fibra y ayuda a hidratar. Los frutos secos son energéticos, ricos en minerales y nutrientes.",
        "El Té Rojo favorece a las digestiones, a controlar los niveles de colesterol, triglicéridos y ácido úrico.",
        "La canela es carminativa y eficaz en con los problemas estomacales.",
        "El clavo es eficaz contra las náuseas, dolores de estómago y muelas.",
        "La fruta aporta vitamina C, antioxidantes, fibra y ayuda a hidratar.",
        "Los frutos secos son energéticos, ricos en minerales y nutrientes.",
        "",
        "  "
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Almendra y canela como notas dominantes."
        },
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Castaño rojizo."
        },
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Galleta especiada, mazapán. Rotundo e intenso, sin astringencia"
        }
    },
    "stock": 235,
    "basePrice": 9.95
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//27018_Mediterraneo_1000x1000_l.jpg",
    "categoria": "Digestiva",
    "descripcion": "Original mezcla a base de romero con elementos cítricos. Un contraste en boca que recuerda a los sabores del Mediterráneo.",
    "name": "Infusión Mediterráneo",
    "longDescription": [
        "",
        "Funcionalidad: Relajante  ¡Quiero saber más!: La originalidad de los componentes de esta mezcla reside en la presencia del romero que dota a esta infusión de un fuerte carácter distintivo y de gran originalidad en cuestión de sabores.   Ingredientes: Manzana, melisa, romero, hierbaluisa, cítricos y cáscara de cítricos, pétalos de naranjo, flores de malva ",
        "Funcionalidad: Relajante",
        "",
        "¡Quiero saber más!: La originalidad de los componentes de esta mezcla reside en la presencia del romero que dota a esta infusión de un fuerte carácter distintivo y de gran originalidad en cuestión de sabores. ",
        "",
        "Ingredientes: Manzana, melisa, romero, hierbaluisa, cítricos y cáscara de cítricos, pétalos de naranjo, flores de malva "
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Leves notas cítricas que dejan paso inmediatamente al intenso aroma del romero."
        },
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Romero, herbal. Suave nota cítrica."
        },
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo ámbar"
        }
    
    },
    "stock": 235,
    "basePrice": 9.8
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/27014_PolarMint_1000x1000_l.jpg",
    "categoria": "Relajante",
    "descripcion": "Combinación de mentas con semillas de escaramujo y un toque de regaliz.",
    "name": "Infusión Polar Mint",
    "longDescription": [
        "",
        "Funcionalidad: Digestivo  ¡Quiero saber más!: Infusión de color amarillo brillante, exquisitamente mentolada, digestiva y refrescante.  Ingredientes: Semillas de escaramujo, menta manzana, hierbabuena, raiz de regaliz, menta piperita",
        "Funcionalidad: Digestivo",
        "",
        "¡Quiero saber más!: Infusión de color amarillo brillante, exquisitamente mentolada, digestiva y refrescante.",
        "",
        "Ingredientes: Semillas de escaramujo, menta manzana, hierbabuena, raiz de regaliz, menta piperita",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Mentolado, dulce y refrescante."
        },
    
       "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Menta dulce, balsámico y refrescante. Fondo dulce (regaliz)."
        },
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo dorado."
        }
    },
    
    "stock": 235,
    "basePrice": 8.50003
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//27020_SuperMoringaRed_1000X1000_l.jpg",
    "categoria": "Vitamínica",
    "descripcion": "Infusión de moringa y rooibos  con hibisco blanco, manzana y trozos de fresa",
    "name": "Infusión Super Moringa Red Fruits",
    "longDescription": [
        "Una mezcla original Tea Shop con ingredientes SUPERFOOD como la Moringa denominada también \\\"La Planta Milagrosa\\\" por sus beneficios anti-age. Originaria de la India oriental, la Moringa es una planta con múltiples sustancias amigas de la salud. Esta mezcla con ingredientes vitamínicos como manzana, escaramujo, Rooibos, hojas de moringa, trocitos de fresa y frambuesa y un toque de hibisco blanco es agradable tanto en caliente como helada en cualquier momento del día.   Funcionalidad: Antioxidante   Otras funciones: Fuente de minerales, Vitamina C, Antiinflamatorio y Aumenta los niveles de energía   ¡Quiero sabes más!: Totalmente sin teína, tiene notas dulces al paladar con un toque ligeramente amargo debido a la Moringa. Para los amantes de las bebidas ISOTÓNICAS y MULTIVITAMINICAS   Ingredientes: Manzana, Rooibos, moringa, hibisco blanco, trozos de fresa, trozos de frambuesa",
        "Una mezcla original Tea Shop con ingredientes SUPERFOOD como la Moringa denominada también \\\"La Planta Milagrosa\\\" por sus beneficios anti-age. Originaria de la India oriental, la Moringa es una planta con múltiples sustancias amigas de la salud. Esta mezcla con ingredientes vitamínicos como manzana, escaramujo, Rooibos, hojas de moringa, trocitos de fresa y frambuesa y un toque de hibisco blanco es agradable tanto en caliente como helada en cualquier momento del día.   Funcionalidad: Antioxidante   Otras funciones: Fuente de minerales, Vitamina C, Antiinflamatorio y Aumenta los niveles de energía   ¡Quiero sabes más!: Totalmente sin teína, tiene notas dulces al paladar con un toque ligeramente amargo debido a la Moringa. Para los amantes de las bebidas ISOTÓNICAS y MULTIVITAMINICAS   Ingredientes: Manzana, Rooibos, moringa, hibisco blanco, trozos de fresa, trozos de frambuesa",
        "Una mezcla original Tea Shop con ingredientes SUPERFOOD como la Moringa denominada también \\\"La Planta Milagrosa\\\" por sus beneficios anti-age. Originaria de la India oriental, la Moringa es una planta con múltiples sustancias amigas de la salud. Esta mezcla con ingredientes vitamínicos como manzana, escaramujo, Rooibos, hojas de moringa, trocitos de fresa y frambuesa y un toque de hibisco blanco es agradable tanto en caliente como helada en cualquier momento del día. ",
        "",
        "Funcionalidad: Antioxidante ",
        "",
        "Otras funciones: Fuente de minerales, Vitamina C, Antiinflamatorio y Aumenta los niveles de energía ",
        "",
        "¡Quiero sabes más!: Totalmente sin teína, tiene notas dulces al paladar con un toque ligeramente amargo debido a la Moringa. Para los amantes de las bebidas ISOTÓNICAS y MULTIVITAMINICAS ",
        "",
        "Ingredientes: Manzana, Rooibos, moringa, hibisco blanco, trozos de fresa, trozos de frambuesa",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Afrutado"
        },
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Con toque de fresa"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo"
        }
    
    },
    "stock": 235,
    "basePrice": 11.949999996
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//75049_MatchaLatteMango_1000X1000_l.jpg",
    "categoria": "Té matcha",
    "descripcion": "Té verde molido con aroma de mango lleno de antioxidantes. Perfecto para crear tus smoothies y elaborar repostería. ",
    "name": "Matcha Latte Mango",
    "longDescription": [
        "Peso neto 30g."
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Aromático, herbal y frutal"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Herbal y frutal"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Verde"
        }
    },
    
    "stock": 235,
    "basePrice": 7.5
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//75086_OrganicMiracleMatcha30gr_21000X1000_l.jpg",
    "categoria": "Té matcha",
    "descripcion": "Té verde Matcha orgánico, muy exclusivo y de gran calidad",
    "name": "Miracle Organic Matcha (30g)",
    "longDescription": [
        "Té verde matcha orgánico categorizado con calidad 5 estrellas procedente de cultivos ecológicos. Cultivado en la zona de Nishio (situado en la región de Aichi): zona de Japón muy conocida por su alta calidad de Matcha.   Tras la recolección, las hojas se cubren alrededor de 21 días (es el máximo tiempo posible). Esto hace que el té adquiera unos niveles óptimos y excelentes de clorofila y nutrientes, de ahí su color más verde y su sabor más dulce de lo habitual. Debido al largo periodo de cubrimiento, se trata de un té exclusivo del cual no existe una gran cantidad en el mundo.",
        "Té verde matcha orgánico categorizado con calidad 5 estrellas procedente de cultivos ecológicos. Cultivado en la zona de Nishio (situado en la región de Aichi): zona de Japón muy conocida por su alta calidad de Matcha.   Tras la recolección, las hojas se cubren alrededor de 21 días (es el máximo tiempo posible). Esto hace que el té adquiera unos niveles óptimos y excelentes de clorofila y nutrientes, de ahí su color más verde y su sabor más dulce de lo habitual. Debido al largo periodo de cubrimiento, se trata de un té exclusivo del cual no existe una gran cantidad en el mundo.",
        "Té verde matcha orgánico categorizado con calidad 5 estrellas procedente de cultivos ecológicos. Cultivado en la zona de Nishio (situado en la región de Aichi): zona de Japón muy conocida por su alta calidad de Matcha. ",
        "",
        "Tras la recolección, las hojas se cubren alrededor de 21 días (es el máximo tiempo posible). Esto hace que el té adquiera unos niveles óptimos y excelentes de clorofila y nutrientes, de ahí su color más verde y su sabor más dulce de lo habitual. Debido al largo periodo de cubrimiento, se trata de un té exclusivo del cual no existe una gran cantidad en el mundo.",
        "",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "fresco herbal"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "fresco herbal"
        },
    

        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Verde"
        }
    },
    
    "stock": 235,
    "basePrice": 7.5
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/11114_Praline_1000x1000_l.jpg",
    "categoria": "Té rojo (Pu Erh)",
    "descripcion": "Delicioso Té rojo,mezcla de Pu Erh Tea, con avellanas picadas y tostadas, algarroba, manzana, canela, crocanti (azucar, avellanas), chicoria, pie de gato amarillo y aromas de avellana, caramelo, nata o vanilla",
    "name": "Té rojo (Pu Erh) Praliné",
    "longDescription": [
        "Delicioso Té rojo Pu Erh, traído directamente desde las mejores plantaciones chinas, y endulzado con canela, manzana, avellanas, crocanti, chicoria y toques de avellana, caramelo, nata o vanilla; que te ayuda a cuidar tu línea mientras endulza tu paladar con su nuevo, sabroso y digestivo mix de sabores. ",
        "INGREDIENTES: Pu Erh, canela, crocanti (azúcar, avellanas), algarroba, manzana, chicoria, pie de gato amarillo, aromas de avellana, caramelo, nata y vainilla. ",
        "INGREDIENTES: Pu Erh, canela, crocanti (azúcar, avellanas), algarroba, manzana, chicoria, pie de gato amarillo, aromas de avellana, caramelo, nata y vainilla. ",
        "ALÉRGENOS: Contiene frutos secos y azúcares.",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Dulce y “achocolatado”"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Dulce. Praliné."
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Castaño rojizo"
        }
    },
    
    "stock": 235,
    "basePrice": 9.95005
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/11109_PuErhChai_1000x1000_l.jpg",
    "categoria": "Té rojo (Pu Erh)",
    "descripcion": "La mezcla de Té Rojo Chai perfecta para perder peso",
    "name": "Té rojo Pu Erh Chai",
    "longDescription": [
        "Máximo sabor con un toque picante. Sorprende por su intensidad y carácter. Ideal para acompañar con leche, al clásico estilo chai, o disfrutarlo por si solo.  Su sabor es intenso y con un ligero gusto picante. Para tomar tanto en caliente, como en frío.   INGREDIENTES: Pu Erh, canela, jengibre, clavo y semillas de cardamomo. BENEFICIOS: No contiene alérgenos.",
        "Máximo sabor con un toque picante. Sorprende por su intensidad y carácter.",
        "Ideal para acompañar con leche, al clásico estilo chai, o disfrutarlo por si solo. ",
        "Su sabor es intenso y con un ligero gusto picante.",
        "Para tomar tanto en caliente, como en frío.",
        "",
        "",
        "INGREDIENTES: Pu Erh, canela, jengibre, clavo y semillas de cardamomo.",
        "BENEFICIOS: No contiene alérgenos."
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Especiado, nota picante."
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Predominan las especias. Toque terroso muy matizado."
        },
    

        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Marrón rojizo, oscuro."
        }
    },
    
    "stock": 235,
    "basePrice": 9.95005
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/16001_1001Noches_1000x1000_l.jpg",
    "categoria": "Té verde",
    "descripcion": "Ideal combinación de Té Negro y Té Verde con flores de jazmín.",
    "name": "Té verde 1001 Noches",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "afrutado, con recuerdo a melocotón maduro."
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "afrutado y muy perfumado."
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "anaranjado brillante"
        }
    },
    
    "stock": 235,
    "basePrice": 7.79999
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//13144_GraciaBlendMatcha_1000x1000_l.jpg",
    "categoria": "Té verde",
    "descripcion": "",
    "name": "Té verde Matcha Gracia Blend Green",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Frutal, dulce"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Amarillo verdoso"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Dulce y afrutado, con retrogusto cítrico de la naranja"
        }
    },
    
    "stock": 235,
    "basePrice": 9.40005
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//10049_DarjeelingFirstFlush_1000X1000_l.jpg",
    "categoria": "Té negro",
    "descripcion": "Té negro First Flush del jardín Teesta Valley and Gielle (Darjeeling)",
    "name": "Té negro Darjeeling First Flush FTGFOP01",
    "longDescription": [
        "Ligero y sedoso con pequeño toque herbal. Perfecto para tomar en los desayunos o después de las comidas. ¡Te ayuda a seguir el ritmo del día!",
        "Ligero y sedoso con pequeño toque herbal.",
        "Perfecto para tomar en los desayunos o después de las comidas. ¡Te ayuda a seguir el ritmo del día!",
        "",
        "INGREDIENTES: Té negro First Flush de Darjeeling",
        "",
        "FUNCIONALIDAD: Energizante",
        "",
        "BENEFICIOS: No contiene alérgenos",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Con pequeño toque herbal"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Ligero y sedoso con pequeño toque herbal"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo champagne"
        }
    },
    
    "stock": 235,
    "basePrice": 15.9
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//10049_DarjeelingFirstFlush_1000X1000_l.jpg",
    "categoria": "Té negro",
    "descripcion": "Té negro Second Flush, jardín Ringtong ",
    "name": "Té negro Darjeeling Ringtong SFTGFOP1 ",
    "longDescription": [
        "Ligero y sedoso con toque herbal.",
        "INGREDIENTES: Té negro second flush de Darjeeling  FUNCIONALIDAD: Energizante.  BENEFICIOS: No contiene alérgenos. ",
        "INGREDIENTES: Té negro second flush de Darjeeling  FUNCIONALIDAD: Energizante.  BENEFICIOS: No contiene alérgenos. ",
        "INGREDIENTES: Té negro second flush de Darjeeling  FUNCIONALIDAD: Energizante.  BENEFICIOS: No contiene alérgenos. ",
        "",
        "INGREDIENTES: Té negro second flush de Darjeeling",
        "INGREDIENTES: Té negro second flush de Darjeeling",
        "",
        "FUNCIONALIDAD: Energizante.",
        "",
        "BENEFICIOS: No contiene alérgenos. ",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Con pequeño toque herbal"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Ligero y sedoso con pequeño toque herbal"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo con un toque amarronado oscuro"
        }
    },
    
    "stock": 235,
    "basePrice": 14.900000005
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//10137_EarlGreyCreme_1000x1000_l.jpg",
    "categoria": "Té negro",
    "descripcion": "Delicioso Earl Grey con toque de crema",
    "name": "Té negro Earl Grey Crème",
    "longDescription": [
        "Una deliciosa mezcla, Té negro con aroma de bergamota y aroma de crema, que nos envuelve dulcemente. Té energizante y estimulante con un leve toque dulce y cítrico.  INGREDIENTES: Blend de dos tés negros, aroma de crema y bergamota.",
        "Una deliciosa mezcla, Té negro con aroma de bergamota y aroma de crema, que nos envuelve dulcemente.",
        "Té energizante y estimulante con un leve toque dulce y cítrico.",
        "Té energizante y estimulante con un leve toque dulce y cítrico.",
        "",
        "INGREDIENTES: Blend de dos tés negros, aroma de crema y bergamota.",
        "BENEFICIOS: No contiene alérgenos."
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Dulzón. El aroma de crema se funde perfectamente con un sutil aroma de bergamota."
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Crema con un leve toque cítrico. Para s golosos. Dulce sin empalagar"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Castaño"
        }
    },
    
    "stock": 235,
    "basePrice": 7.95003
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/12106_SpicyStrawberry_1000x1000_l.jpg",
    "categoria": "Té Oolong (azul)",
    "descripcion": "Té Oolong con fresa y una exótica mezcla de especias.",
    "name": "Té Oolong (azul) Spicy Strawberry",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Afrutado, dulce con leve matiz especiado."
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Fresa con pinceladas de canela y clavo. Frescor del cardamomo y toque picante del jengibre."
        },
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Oro viejo"
        }
    },
    
    "stock": 235,
    "basePrice": 9.5
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/12003_TieKuanYin_1000x1000_l.jpg",
    "categoria": "Té Oolong (azul)",
    "descripcion": "De la provincia de Fujian, es uno de los tés Oolong más apreciados en China.",
    "name": "Té Oolong (azul) Tie Kuan Yin",
    "longDescription": [],
    "caracteristicas": [{
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Dulce, floral y tostado."
        }
    },
    {
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Dulce, cereal tostado"
        }
    },
    {
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Caramelo claro"
        }
    }
    ],
    "stock": 235,
    "basePrice": 8.95
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//11117_CinammonRoll_1000X1000_l.jpg",
    "categoria": "Té rojo (Pu Erh)",
    "descripcion": "Té rojo dulce y especiado con canela",
    "name": "Té rojo (Pu Erh) Cinnamon Roll",
    "longDescription": [
        "",
        "Funcionalidad: Detox",
        "",
        "Ingredientes: Té Pu-Erh - Té con una fermentación especial,  Cáscara de cacao, Manzana , Canela, Granos de cacao, Algarroba, Cúrcuma, Aroma de canela, Pétalos de rosa roja, Pétalos de caléndula",
        ""
    ],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "canela y el dulzor del cacao"
        },
    
       "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "La terrosidad del Té rojo se funde perfectamente con el carácter dulzón y especiado de la canela y el cacao"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Castaño rojizo"
        }
    },
    
    "stock": 235,
    "basePrice": 9.10000003
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007//13042_JapanBanchaSuperior_1000X1000_l.jpg",
    "categoria": "Té verde",
    "descripcion": "Te verde puro de Japón.",
    "name": "Té verde Japan Bancha Superior",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Marcadamente tropical. Dulce y fresco a la vez."
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Cocktail Tropical. Toque fresco del Aloe vera y dulce del Lychee."
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo pálido"
        }
    },
    
    "stock": 235,
    "basePrice": 11.49995
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/13006_JapanGenmaicha_1000x1000_l.jpg",
    "categoria": "Té verde",
    "descripcion": "Clásico Té verde japonés con arroz tostado y maíz.",
    "name": "Té verde Japan Genmaicha",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Cereal tostado"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Cereal tostado, punto salado y ligeramente vegetal. Con cuerpo. Fresco."
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo verdoso."
        }
    },
    
    "stock": 235,
    "basePrice": 9.95005
},
{
    "mainImage": "https://dhb3yazwboecu.cloudfront.net/1007/fotosProducto/tes/13035_JapanGyokuroAsahi_1000x1000_l.jpg",
    "categoria": "Té verde",
    "descripcion": "Té verde Gyokuro Asahi, de recolección de primavera tardía.",
    "name": "Té verde Japan Gyokuro Asahi",
    "longDescription": [],
    "caracteristicas": {
        "Aroma": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
            "texto": "Sutil y dulzón rebajando un poco las notas vegetales"
        },
    
    
        "Sabor": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
            "texto": "Suave, sin astringencia, dulce y ligero"
        },
    
    
        "Color": {
            "image": "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
            "texto": "Amarillo verdoso, denso y elegante"
        }
    },
    
    "stock": 235,
    "basePrice": 18.750000005
}
]



let tes = teas.map(function (te) {
    return new Tea(te);
});
console.log(tes);
Tea.insertMany(tes);



app.listen(3001, function () {
    console.log('servidor en marcha');
});