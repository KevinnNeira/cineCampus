const { MongoClient } = require("mongodb");

exports.connectMongodb = async()=>{
    const url =  `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    const usuario = new MongoClient(url)
    await usuario.connect();
    const db = usuario.db('crudExpress');
    const collection = db.collection('usuarios')
    return collection
}