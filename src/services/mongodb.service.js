
const { MongoClient } = require("mongodb");

const uri = process.env.URI_MONGODB;

const client = new MongoClient(uri);

const conectarDB = async () => {
  await client.connect();
  let DB = client.db(process.env.DB_MONGODB);
  return DB;
};

/**
 * 
 * @param {String} nombreColeccion 
 * @param {JSON} filtro 
 * @returns Documentos consultados
 */
const consultarDocumentos = async (nombreColeccion, filtro) => {
  let coleccion = await definirColeccion(nombreColeccion);
  filtro = filtro ? filtro : {};
  return coleccion.find(filtro).limit(parseInt(process.env.DEFAULT_LIMIT_PROPERTIES)).toArray();
};


/**
 * 
 * @param {String} nombreColeccion 
 * @returns Diferentes tipos de propiedades existentes sin repetición.
 */
const consultarTypes = async (nombreColeccion) => {
  let coleccion = await definirColeccion(nombreColeccion);
  return coleccion.distinct("property_type");
};

/**
 * 
 * @param {String} nombreColeccion 
 * @returns 20 propiedades de airbnb con mayor numero de reseñas
 */
const consultarMayorNumeroReviews = async (nombreColeccion) => {
  let coleccion = await definirColeccion(nombreColeccion);
  return coleccion.find().sort({ number_of_reviews: -1 })
    .project({ name: 1, beds: 1, number_of_reviews: 1, price: 1 }).limit(20).toArray();
};

/**
 * 
 * @param {String} nombreColeccion 
 * @returns Coleccion traida de MongoDB
 */
const definirColeccion = async (nombreColeccion) => {
  let db = await conectarDB();
  let coleccion = db.collection(nombreColeccion);
  return coleccion;
};

module.exports = { 
    consultarDocumentos, 
    consultarTypes,
    consultarMayorNumeroReviews
};