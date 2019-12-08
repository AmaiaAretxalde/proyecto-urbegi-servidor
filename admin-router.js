const router = require('express').Router();
const Tea = require('./models/Tea')

/*

Inserta Te en mongo
espera un json como este:
{ 
    "mainImage":"https://conceptodefinicion.de/wp-content/uploads/2015/09/infusion-e1441986088908.jpg",
    "categoria":"Aromatico",
    "descripcion":"Infusión descrita",
    "Aroma":"Manzana",
    "Sabor":"Manzana con toque cítrico.",
    "Color":"Amarillo dorado.",
    "name":"Infusión nombrada",
    "longDescription":[ 
        "Infudsion  que  querras tomar",
        "Funcionalidad: Relajante ",
        "",
        "¡Quiero saber más!: No quiero saber ",
        "Ingredientes:  Un monton "
    ]
}
*/



router.post('/tea', async function (req, res) {
  let body=req.body
  
  let tea = new Tea();


  tea.mainImage = body.mainImage;
  tea.categoria = req.body.categoria
  tea.descripcion = req.body.descripcion
  tea.name = req.body.name
  tea.longDescription = req.body.longDescription
  tea.caracteristicas.Aroma = {
    image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/aroma.svg",
    texto: req.body.Aroma
  }
  tea.caracteristicas.Sabor = {
    image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/sabor.svg",
    texto: req.body.Sabor
  }
  tea.caracteristicas.Color = {
    image: "https://dhb3yazwboecu.cloudfront.net/1007/icons/color.svg",
    texto: req.body.Color
  }

  tea.stock = req.body.stock
  tea.basePrice = req.body.basePrice


  



  await tea.save();
  res.send({ mensaje: 'producto añadido' });
})
module.exports = router;


