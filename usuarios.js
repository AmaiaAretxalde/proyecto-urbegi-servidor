const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/teashop');
const User = mongoose.model('User', { nombre: String, apellido: String, email: String, direccion: String, localidad: String, provincia: String, cp: String, telefono: String, password: String });

let usuarios = [
    {
        "nombre": "Amaia",
        "apellido": "Aretxalde",
        "email": "amaia.aretxa@gmail.com",
        "direccion": "Alameda recalde 2,3C",
        "localidad": "Bilbo",
        "provincia": "Bizkaia",
        "cp": "48007",
        "telefono": "689124290",
    },
    {
        "nombre": "Eneritz",
        "apellido": "Burgoa",
        "email": "eneritz.ene@gmail.com",
        "direccion": "Calle Doctor Ornilla 56,2D",
        "localidad": "Txurdinaga-Bilbo",
        "provincia": "Bizkaia",
        "cp": "48004",
        "telefono": "676899782",
    },
    {
        "nombre": "Alicia",
        "apellido": "Aguirre",
        "email": "ali.agu@gmail.com",
        "direccion": "Muntsaratz 20,5G",
        "localidad": "Abadiño",
        "provincia": "Bizkaia",
        "cp": "48220",
        "telefono": "609803216",
    },
    {
        "nombre": "MIkel",
        "apellido": "Intxausti",
        "email": "mikel.in@gmail.com",
        "direccion": "Calle Arrandi 6,2E",
        "localidad": "Barakaldo",
        "provincia": "Bizkaia",
        "cp": "48901",
        "telefono": "632659410",
    },
    {
        "nombre": "Jóse",
        "apellido": "Garcia",
        "email": "josegar@gmail.com",
        "direccion": "Andikoetxe kalea 9,1A",
        "localidad": "Getxo",
        "provincia": "Bizkaia",
        "cp": "48993",
        "telefono": "677554290",
    },
    {
        "nombre": "Peio",
        "apellido": "Arrikoetxea",
        "email": "arri-arri@gmail.com",
        "direccion": "Calle las Viñas 25,6B",
        "localidad": "Santurtzi",
        "provincia": "Bizkaia",
        "cp": "48980",
        "telefono": "681231064",
    },
]
let users = usuarios.map(function (us) {
    return new User(us);
});


for (i in users) {

    let user=users[i]
    User.find({ email: user.email }, function (err, usuariosEnBD) {
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
