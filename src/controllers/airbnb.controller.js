
// Importar los servicio
const { consultarDocumentos, 
        consultarTypes} = require('../services/mongodb.service');

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultarAirbnb = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "Airbnb consultados"
        let resultado = await consultarDocumentos(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los airbnb."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
const consultarPropertyTypes = async (req, res) => {
    let respuesta = {}
    try {
        respuesta.ok = true
        respuesta.message = "tipos de propiedades consultados"
        let resultado = await consultarTypes(process.env.COLLECTION_AIRBNB)
        respuesta.info = resultado
        res.send(respuesta)
    } catch (error) {
        console.log(error);
        respuesta.ok = false
        respuesta.message = "Ha ocurrido un error consultando los tipos de propiedades."
        respuesta.info = error
        res.status(500).send(respuesta)
    }
}

module.exports = {
    consultarAirbnb,
    consultarPropertyTypes
}