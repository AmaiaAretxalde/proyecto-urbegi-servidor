const router = require('express').Router();
const Tea = require('./models/Tea')

/*

Inserta Te en mongo
espera un json como este:
{ 
    "mainImage":"https://conceptodefinicion.de/wp-content/uploads/2015/09/infusion-e1441986088908.jpg",
    "categoria":"Aromatico",
    "descripcion":"Infusión descrita",
    "aroma":"Manzana",
    "sabor":"Manzana con toque cítrico.",
    "color":"Amarillo dorado.",
    "name":"Infusión nombrada",
    "stock" : 235,
    "basePrice" : 9.8,
    "longDescription":[ 
        "Infudsion  que  querras tomar",
        "Funcionalidad: Relajante ",
        "",
        "¡Quiero saber más!: No quiero saber ",
        "Ingredientes:  Un monton "
    ]
}
*/



router.post('/tea', async function(req, res) {
    let body = req.body

    let tea = new Tea();
    tea.mainImage = body.mainImage;
    tea.categoria = req.body.categoria
    tea.descripcion = req.body.descripcion
    tea.name = req.body.name
    tea.longDescription = req.body.longDescription
    tea.caracteristicas.aroma = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
        texto: req.body.aroma
    }
    tea.caracteristicas.sabor = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
        texto: req.body.sabor
    }
    tea.caracteristicas.color = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
        texto: req.body.color
    }

    tea.stock = req.body.stock
    tea.basePrice = req.body.basePrice






    await tea.save();
    res.send({ mensaje: 'producto añadido' });
})





/*

Modifica un  Te  por id en mongo
espera un json como este:
{ 
    "mainImage":"https://conceptodefinicion.de/wp-content/uploads/2015/09/infusion-e1441986088908.jpg",
    "categoria":"Aromatico",
    "descripcion":"Infusión descrita",
    "aroma":"Manzana",
    "sabor":"Manzana con toque cítrico.",
    "color":"Amarillo dorado.",
    "name":"Infusión nombrada",
    "stock" : 235,
    "basePrice" : 9.8,
    "longDescription":[ 
        "Infudsion  que  querras tomar",
        "Funcionalidad: Relajante ",
        "",
        "¡Quiero saber más!: No quiero saber ",
        "Ingredientes:  Un monton "
    ]
}
*/
router.put('/tea/:id', async function(req, res) {
    let identificador = req.params.id
    let body = req.body

    let jsonTea = {};
    jsonTea.mainImage = body.mainImage;
    jsonTea.categoria = req.body.categoria
    jsonTea.descripcion = req.body.descripcion
    jsonTea.name = req.body.name
    jsonTea.longDescription = req.body.longDescription
    jsonTea.caracteristicas = {}
    jsonTea.caracteristicas.aroma = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
        texto: req.body.aroma
    }
    jsonTea.caracteristicas.sabor = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
        texto: req.body.sabor
    }
    jsonTea.caracteristicas.color = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
        texto: req.body.color
    }

    jsonTea.stock = req.body.stock
    jsonTea.basePrice = req.body.basePrice


    await Tea.updateOne({ _id: identificador }, jsonTea, { upsert: true });
    res.send({ mensaje: 'tea modificado', tea: jsonTea });

})
module.exports = router;