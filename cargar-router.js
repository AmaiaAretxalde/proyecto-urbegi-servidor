const router = require('express').Router();

// OBTENER DATOS PARA NOVEDADES

router.post('/', function (req, res) {

    db.collection('historico').find({ Year: { $gte: anyoInicio, $lte: anyoFin } }).toArray(function (err, datos) {

        if (err !== null) {
            res.send({ mensaje: 'error404' })
        } else {

            for (let i = 0; i < datos.length; i++) {

                let anyo = datos[i].Year;

                let poblacion = datos[i]['Total Population'];

                totalesAnuales[anyo] += poblacion;

            }

            for (let i in totalesAnuales) { //el bucle for in nos permite iterar a través de objetos
                totales.push(totalesAnuales[i]) //creamos un nuevo objeto con el el año como clave y el total de desplazados como valor
                // totalAnualArray.push(newObjeto) //introducimos el objeto en el array creado arriba
            }

        }
        res.send(totales); //mandamos en la respuesta el array de objetos
    });

});

module.exports = router;