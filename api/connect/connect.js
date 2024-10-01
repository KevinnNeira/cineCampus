const { MongoClient } = require('mongodb');

exports.connectMongodb = async()=>{
    const url =  `mongodb://root:campus2023@172.16.102.48:27017/`;
    const usuario = new MongoClient(url)
    await usuario.connect();
    const db = usuario.db('cineCampus');
    console.log(db);
    
    return db;
}