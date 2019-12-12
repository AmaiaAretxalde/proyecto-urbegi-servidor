const mongoose = require('mongoose');
const User = require('./models/User');

(async function() {
    mongoose.connect('mongodb://localhost:27017/teashop');


    let usuarios = [{
            "nombre": "Amaia",
            "apellido": "Aretxalde",
            "email": "amaia.aretxa@gmail.com",
            "direccion": "Alameda recalde 2,3C",
            "localidad": "Bilbo",
            "provincia": "Bizkaia",
            "cp": 48007,
            "telefono": 689124290,
            "sabores": [{ "nombre": "dulce", "puntuacion": 1 },
                { "nombre": "citrico", "puntuacion": 5 },
                { "nombre": "floral", "puntuacion": 2 },
                { "nombre": "especiado", "puntuacion": 4 },
                { "nombre": "afrutado", "puntuacion": 3 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 2 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 4 },
                { "nombre": "isotonico", "puntuacion": 3 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "Infusion sweet turron" }, { "nombre": "te negro christmastea black" }, { "nombre": "te negro chai latte" }],
        },

        {
            "nombre": "Eneritz",
            "apellido": "Burgoa",
            "email": "eneritz.ene@gmail.com",
            "direccion": "Calle Doctor Ornilla 56,2D",
            "localidad": "Txurdinaga-Bilbo",
            "provincia": "Bizkaia",
            "cp": 48004,
            "telefono": 676899782,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 1 },
                { "nombre": "floral", "puntuacion": 3 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 4 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 4 },
                { "nombre": "relajante", "puntuacion": 2 },
                { "nombre": "antioxidante", "puntuacion": 5 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 1 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te verde christmastea green" }, { "nombre": "infusion camomilla golden" },
                { "nombre": "te rojo (pu erh) praline" }
            ],

        },
        {
            "nombre": "Alicia",
            "apellido": "Aguirre",
            "email": "ali.agu@gmail.com",
            "direccion": "Muntsaratz 20,5G",
            "localidad": "Abadiño",
            "provincia": "Bizkaia",
            "cp": 48220,
            "telefono": 609803216,
            "sabores": [{ "nombre": "dulce", "puntuacion": 3 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 4 },
                { "nombre": "especiado", "puntuacion": 1 },
                { "nombre": "afrutado", "puntuacion": 5 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 4 },
                { "nombre": "digestivo", "puntuacion": 5 },
                { "nombre": "relajante", "puntuacion": 3 },
                { "nombre": "antioxidante", "puntuacion": 1 },
                { "nombre": "isotonico", "puntuacion": 5 },
                { "nombre": "depurativo", "puntuacion": 2 }
            ],
            "cesta": [],
            "isAdmin": false,
            "pedidos": [{ "nombre": "te verde japan kukicha organic superior" }, { "nombre": "infusion herbal spirit" }],
        },
        {
            "nombre": "Mikel",
            "apellido": "Intxausti",
            "email": "mikel.in@gmail.com",
            "direccion": "Calle Arrandi 6,2E",
            "localidad": "Barakaldo",
            "provincia": "Bizkaia",
            "cp": 48901,
            "telefono": 632659410,
            "sabores": [{ "nombre": "dulce", "puntuacion": 4 },
                { "nombre": "citrico", "puntuacion": 3 },
                { "nombre": "floral", "puntuacion": 5 },
                { "nombre": "especiado", "puntuacion": 2 },
                { "nombre": "afrutado", "puntuacion": 1 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 5 },
                { "nombre": "digestivo", "puntuacion": 1 },
                { "nombre": "relajante", "puntuacion": 4 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 1 },
                { "nombre": "depurativo", "puntuacion": 3 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "Infusion indian yogui" }],
        },
        {
            "nombre": "Jose",
            "apellido": "Garcia",
            "email": "josegar@gmail.com",
            "direccion": "Andikoetxe kalea 9,1A",
            "localidad": "Getxo",
            "provincia": "Bizkaia",
            "cp": 48993,
            "telefono": 677554290,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 4 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 3 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 1 },
                { "nombre": "digestivo", "puntuacion": 1 },
                { "nombre": "relajante", "puntuacion": 4 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 1 },
                { "nombre": "depurativo", "puntuacion": 3 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion magic forest" }, { "nombre": "te verde japan genmaicha" }, { "nombre": "te verde japan gyokuro asahi" }, { "nombre": "te verde 1001 noches" }],
        },
        {
            "nombre": "Peio",
            "apellido": "Arrikoetxea",
            "email": "arri-arri@gmail.com",
            "direccion": "Calle las Viñas 25,6B",
            "localidad": "Santurtzi",
            "provincia": "Bizkaia",
            "cp": 48980,
            "telefono": 681231064,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 1 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion polar mint" }, { "nombre": "super moringa red fruits" }, { "nombre": "te oolong (azul) spily strawberry" }, { "nombre": "infusion golden cake" }],
        },
        {
            "nombre": "Iker",
            "apellido": "Murga",
            "email": "Iker.murgi@gmail.com",
            "direccion": "Alameda recalde 3,4A",
            "localidad": "Bilbo",
            "provincia": "Bizkaia",
            "cp": 48007,
            "telefono": 689124291,
            "sabores": [{ "nombre": "dulce", "puntuacion": 3 },
                { "nombre": "citrico", "puntuacion": 3 },
                { "nombre": "floral", "puntuacion": 4 },
                { "nombre": "especiado", "puntuacion": 1 },
                { "nombre": "afrutado", "puntuacion": 3 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 1 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 3 },
                { "nombre": "antioxidante", "puntuacion": 4 },
                { "nombre": "isotonico", "puntuacion": 5 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te negro earl grey creme" }],
        },
        {
            "nombre": "Jon",
            "apellido": "Sinde",
            "email": "jonsin@gmail.com",
            "direccion": "Calle Doctor Ornilla 5,2E",
            "localidad": "Txurdinaga-Bilbo",
            "provincia": "Bizkaia",
            "cp": 48004,
            "telefono": 676899783,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 1 },
                { "nombre": "floral", "puntuacion": 5 },
                { "nombre": "especiado", "puntuacion": 3 },
                { "nombre": "afrutado", "puntuacion": 4 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 1 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 4 },
                { "nombre": "antioxidante", "puntuacion": 3 },
                { "nombre": "isotonico", "puntuacion": 5 },
                { "nombre": "depurativo", "puntuacion": 2 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te oolong (azul) tie kuan yin" }, { "nombre": "rooibos christmastea rooibos" }],
        },
        {
            "nombre": "Marta",
            "apellido": "Lopez",
            "email": "martalo@gmail.com",
            "direccion": "Muntsaratz 2,1C",
            "localidad": "Abadiño",
            "provincia": "Bizkaia",
            "cp": 48220,
            "telefono": 609803215,
            "sabores": [{ "nombre": "dulce", "puntuacion": 3 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 4 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 4 },
                { "nombre": "relajante", "puntuacion": 3 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 5 },
                { "nombre": "depurativo", "puntuacion": 1 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "matcha latte mango" }, { "nombre": "infusion indian secret" }],
        },
        {
            "nombre": "Ander",
            "apellido": "Salas",
            "email": "salas@gmail.com",
            "direccion": "Calle Arrandi 20,6E",
            "localidad": "Barakaldo",
            "provincia": "Bizkaia",
            "cp": 48901,
            "telefono": 632659416,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 1 },
                { "nombre": "floral", "puntuacion": 4 },
                { "nombre": "especiado", "puntuacion": 3 },
                { "nombre": "afrutado", "puntuacion": 4 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 5 },
                { "nombre": "digestivo", "puntuacion": 4 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 3 },
                { "nombre": "depurativo", "puntuacion": 4 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te blanco snow christmas" }, { "nombre": "te negro oriental christmas" }, { "nombre": "te verde japan bancha superior" }, { "nombre": "infusion apple temptation" }, { "nombre": "infusion cocoa orange" }],
        },
        {
            "nombre": "Borja",
            "apellido": "Garcia",
            "email": "borjaborja@gmail.com",
            "direccion": "Andikoetxe kalea 1,4B",
            "localidad": "Getxo",
            "provincia": "Bizkaia",
            "cp": 48993,
            "telefono": 677554224,
            "sabores": [{ "nombre": "dulce", "puntuacion": 1 },
                { "nombre": "citrico", "puntuacion": 4 },
                { "nombre": "floral", "puntuacion": 5 },
                { "nombre": "especiado", "puntuacion": 4 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 5 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 2 },
                { "nombre": "antioxidante", "puntuacion": 4 },
                { "nombre": "isotonico", "puntuacion": 2 },
                { "nombre": "depurativo", "puntuacion": 3 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te rojo (pu erh) red curcuma latte" }, { "nombre": "te negro darjeeling ringtone SFTGFOP1" }, { "nombre": "Té negro Darjeeling First Flush FTGFOP01" }, { "nombre": "te verde matcha gracia blend green" }],
        },
        {
            "nombre": "Alberto",
            "apellido": "Corada",
            "email": "corada@gmail.com",
            "direccion": "Calle las Viñas 2,6E",
            "localidad": "Santurtzi",
            "provincia": "Bizkaia",
            "cp": 48980,
            "telefono": 681231022,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 4 },
                { "nombre": "especiado", "puntuacion": 3 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 5 },
                { "nombre": "antioxidante", "puntuacion": 4 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 2 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "miracle organic matcha (30gr)" }, { "nombre": "te verde japan bancha superior" }],
        },

        {
            "nombre": "Alberto",
            "apellido": "Medina",
            "email": "alberto.medina@gmail.com",
            "direccion": "Alameda recalde 18,9C",
            "localidad": "Bilbo",
            "provincia": "Bizkaia",
            "cp": 48007,
            "telefono": 689124784,
            "sabores": [{ "nombre": "dulce", "puntuacion": 4 },
                { "nombre": "citrico", "puntuacion": 1 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 5 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 3 },
                { "nombre": "depurativo", "puntuacion": 3 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion cocktail de frutas" }, { "nombre": "infusion camomilla golden" }, { "nombre": "infusion calm moment" }],
        },
        {
            "nombre": "Itxaso",
            "apellido": "Laka",
            "email": "i.laka@gmail.com",
            "direccion": "Calle Doctor Ornilla 1,2D",
            "localidad": "Txurdinaga-Bilbo",
            "provincia": "Bizkaia",
            "cp": 48004,
            "telefono": 676899287,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 4 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 3 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 4 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 2 },
                { "nombre": "antioxidante", "puntuacion": 1 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 2 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te negro chai latte" }, { "}nombre": "infusion ginger balm" }, { "nombre": "infusion polar mint" }, { "nombre": "te blanco snow christmas" }],
        },
        {
            "nombre": "Monica",
            "apellido": "Vicente",
            "email": "monivi@gmail.com",
            "direccion": "Muntsaratz 37,3E",
            "localidad": "Abadiño",
            "provincia": "Bizkaia",
            "cp": 48220,
            "telefono": 609803342,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 5 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 2 },
                { "nombre": "antioxidante", "puntuacion": 4 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te verde japan kukicha organic superior" }],
        },
        {
            "nombre": "Tamsir",
            "apellido": "Ndoye",
            "email": "tamsir@gmail.com",
            "direccion": "Calle Arrandi 6,2E",
            "localidad": "Barakaldo",
            "provincia": "Bizkaia",
            "cp": 48901,
            "telefono": 632659912,
            "sabores": [{ "nombre": "dulce", "puntuacion": 4 },
                { "nombre": "citrico", "puntuacion": 3 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 2 },
                { "nombre": "digestivo", "puntuacion": 5 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 1 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te verde japan gyokuro asahi" }, { "nombre": "infusion herbal spirit" }],
        },
        {
            "nombre": "Xabi",
            "apellido": "Hernando",
            "email": "xhernando@gmail.com",
            "direccion": "Andikoetxe kalea 3,1B",
            "localidad": "Getxo",
            "provincia": "Bizkaia",
            "cp": 48993,
            "telefono": 677554349,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 3 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 2 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 3 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion mediterraneo" }, { "nombre": "te verde japan genmaicha" }, { "nombre": "infusion indian yogi" }, { "nombre": "miracle organic matcha (30gr)" }],
        },
        {
            "nombre": "Jasone",
            "apellido": "Beldarrain",
            "email": "jasobel@gmail.com",
            "direccion": "Calle las Viñas 11,3A",
            "localidad": "Santurtzi",
            "provincia": "Bizkaia",
            "cp": 48980,
            "telefono": 681231765,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 5 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 4 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 3 },
                { "nombre": "antioxidante", "puntuacion": 5 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion polar mint" }, { "nombre": "infusion golden cake" }, { "nombre": "te oolong (azul) spily strawberry" }, { "nombre": "infusion ginger balm" }],
        },
        {
            "nombre": "Eneko",
            "apellido": "Etxaniz",
            "email": "etxaniz@gmail.com",
            "direccion": "Alameda recalde 13,4C",
            "localidad": "Bilbo",
            "provincia": "Bizkaia",
            "cp": 48007,
            "telefono": 689124987,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 3 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 5 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te verde japan gyokuro asahi" }, { "nombre": "infusion apple temptation" }, { "nombre": "infusion magic forest" }],
        },
        {
            "nombre": "Julio",
            "apellido": "Bernal",
            "email": "juliober@gmail.com",
            "direccion": "Calle Doctor Ornilla 9,2A",
            "localidad": "Txurdinaga-Bilbo",
            "provincia": "Bizkaia",
            "cp": 48004,
            "telefono": 676899783,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 4 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 5 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 3 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 2 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "rooibos christmastea rooibos" }],
        },
        {
            "nombre": "Maria",
            "apellido": "Vazquez",
            "email": "vaz.maria@gmail.com",
            "direccion": "Muntsaratz 23,4A",
            "localidad": "Abadiño",
            "provincia": "Bizkaia",
            "cp": 48220,
            "telefono": 609803567,
            "sabores": [{ "nombre": "dulce", "puntuacion": 4 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 3 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 4 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 5 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te verde japan genmaicha" }, { "nombre": "te rojo (pu erh) praline" }],
        },
        {
            "nombre": "Mario",
            "apellido": "Rodriguez",
            "email": "mario.ro@gmail.com",
            "direccion": "Calle Arrandi 12,1B",
            "localidad": "Barakaldo",
            "provincia": "Bizkaia",
            "cp": 48901,
            "telefono": 632659902,
            "sabores": [{ "nombre": "dulce", "puntuacion": 2 },
                { "nombre": "citrico", "puntuacion": 2 },
                { "nombre": "floral", "puntuacion": 4 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 3 },
                { "nombre": "digestivo", "puntuacion": 5 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 3 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te blanco snow christmas", }],
        },
        {
            "nombre": "Benito",
            "apellido": "Garate",
            "email": "benito.garate@gmail.com",
            "direccion": "Andikoetxe kalea 17,1C",
            "localidad": "Getxo",
            "provincia": "Bizkaia",
            "cp": 48993,
            "telefono": 677554356,
            "sabores": [{ "nombre": "dulce", "puntuacion": 5 },
                { "nombre": "citrico", "puntuacion": 1 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 5 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 4 },
                { "nombre": "digestivo", "puntuacion": 2 },
                { "nombre": "relajante", "puntuacion": 1 },
                { "nombre": "antioxidante", "puntuacion": 1 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "te rojo (pu erh) red curcuma latte" }],
        },
        {
            "nombre": "Rosa",
            "apellido": "Bayona",
            "email": "rosa.bayona@gmail.com",
            "direccion": "Calle las Viñas 3,5A",
            "localidad": "Santurtzi",
            "provincia": "Bizkaia",
            "cp": 48980,
            "telefono": 681231111,
            "sabores": [{ "nombre": "dulce", "puntuacion": 4 },
                { "nombre": "citrico", "puntuacion": 3 },
                { "nombre": "floral", "puntuacion": 1 },
                { "nombre": "especiado", "puntuacion": 1 },
                { "nombre": "afrutado", "puntuacion": 2 }
            ],


            "funciones": [{ "nombre": "estimulante", "puntuacion": 2 },
                { "nombre": "digestivo", "puntuacion": 3 },
                { "nombre": "relajante", "puntuacion": 2 },
                { "nombre": "antioxidante", "puntuacion": 5 },
                { "nombre": "isotonico", "puntuacion": 4 },
                { "nombre": "depurativo", "puntuacion": 5 }
            ],
            "cesta": [],
            "isAdmin": false,

            "pedidos": [{ "nombre": "infusion indian secret" }, { "nombre": "infusion sweet turron" }, { "nombre": "infusion ginger balm" }, { "nombre": "te verde 1001 noches" }, { "nombre": "infusion mediterraneo" }],
        },
    ]
    let users = usuarios.map(function(us) {
        return new User(us);
    });


    for (i in users) {

        let user = users[i]
        await User.find({ email: user.email }, function(err, usuariosEnBD) {
            if (err !== null) {
                console.log(`ERROR:${err}`);
                return;
            }
            if (usuariosEnBD.length !== 0) {
                console.log(`Error en el registro. Email  ya registrado`);
            } else {
                user.save();
                console.log(`usuario registrado`)
            }
        });
    }
    process.exit(0)

})()