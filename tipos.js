let tipos =[{
    "nombre": "Té verde",
    "foto": "https://as.com/deporteyvida/imagenes/2017/05/17/portada/1495017351_924129_1495017569_noticia_normal.jpg",
    "descripcion": "El té verde (en chino tradicional, 綠茶; en chino simplificado, 绿茶; pinyin, Lǜ chá) es un tipo de té Camellia sinensis que no ha sufrido una oxidación durante su procesado, a diferencia del té negro, ya que lashojas se recogen frescas y después de someterse al secado, se prensan, enrollan, trituran y finalmente sesecan. El té verde supone entre una cuarta y una quinta parte del total de té producido mundialmente. Los principales países productores de té verde son China, Japón y Vietnam.1​Se ha hecho más popular en,Occidente, que tradicionalmente toma té negro.",
    "modoPreparacion": [
        "-Pon el agua que necesites a calentarse hasta la temperatura que necesites. Para ello te recomiendo el método tradicional de calentarla en un cazo, o idealmente en un hervidor eléctrico.",
        "-Coloca la cantidad de té verde adecuada en el infusor de tu tetera o en el infusor individual si solo vas a prepararte una taza. Para los tés verdes lo ideal son unos 2,5 gr de té por cada taza, aunque puedes adaptar la cantidad a tu gusto.",
        "-Cuando el agua esté a la temperatura adecuada, en este caso y para este té la necesito a 80ºC, viértela sobre el infusor de tu taza o tetera y ponte un temporizador para contar los minutos que debe estar el té infusionando el agua. Para este té eran solamente 2-3 minutos.",
        
    ],
    "beneficios": [
        "-Protege las células del organismo, por ser rico en antioxidantes",
        "-Retarda el envejecimiento celular, gracias a su alto contenido de antioxidantes que combaten los radicales libres principal causante del envejecimiento de las células",
        "-Ayuda a regular los niveles de colesterol, principalmente del colesterol malo LDL",
        "-Previene enfermedades del corazón inhibiendo la formación de coágulos en la sangre disminuyendo el riesgo de trombosis y a su vez el riesgo de ataques cardíacos y ACV",
        "-Ayuda a prevenir varios tipos de cáncer, debido a que evita el crecimiento de las células cancerígenas.",
        "-Posee propiedades antimicrobianas, que ayudan a prevenir infecciones como resfriados, gripes e infecciones como Influenza A y B. ",
        "-Mejora la salud dental, debido a sus propiedades antimicrobianas y antiinflamatorias que evitan la formación de caries y de periodontitis. Ayudando también a controlar el mal aliento.",
        "-Ayuda a regular los niveles de azúcar, por lo que es una buena opción tanto para prevenir la diabetes como para aquellas personas que ya la padecen. ",

    ]
}];

let tiposte = tipos.map(function (tipo) {
    return new Tipo(tipo);
});
console.log(tiposte);
Tipo.insertMany(tiposte);

