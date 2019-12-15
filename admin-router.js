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
    let elTe = req.body.te

    let tea = new Tea();
    tea.mainImage = elTe.mainImage
    tea.categoria = elTe.categoria
    tea.descripcion = elTe.descripcion
    tea.name = elTe.name
    tea.longDescription = elTe.longDescription
    tea.caracteristicas.aroma = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
        texto: elTe.aroma
    }
    tea.caracteristicas.sabor = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
        texto: elTe.sabor
    }
    tea.caracteristicas.color = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
        texto: elTe.color
    }

    tea.stock = elTe.stock
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
    let body = req.body.te;
    console.log(body)
    let jsonTea = {};
    jsonTea.mainImage = body.mainImage;
    jsonTea.categoria = body.categoria
    jsonTea.descripcion = body.descripcion
    jsonTea.name = body.name
    jsonTea.longDescription = body.longDescription
    jsonTea.caracteristicas = {}
    jsonTea.caracteristicas.aroma = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
        texto: body.aroma
    }
    jsonTea.caracteristicas.sabor = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
        texto: body.sabor
    }
    jsonTea.caracteristicas.color = {
        image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
        texto: body.color
    }

    jsonTea.stock = body.stock
    jsonTea.basePrice = body.basePrice

    console.log(jsonTea)
    await Tea.updateOne({ _id: identificador }, jsonTea, { upsert: true });
    res.send({ mensaje: 'tea modificado', tea: jsonTea });

})
module.exports = router;