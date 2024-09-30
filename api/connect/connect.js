const { MongoClient } = require('mongodb');

exports.connectMongodb = async()=>{
    const url =  `mongodb://root:campus2023@localhost:27017/`;
    const usuario = new MongoClient(url)
    await usuario.connect();
    const db = usuario.db('cineCampus');
    return db
}