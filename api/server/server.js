const { connectMongodb } = require('../connect/connect')
const express = require('express')
const cors = require('cors')
const { ObjectId } = require('mongodb')


const user = express();

user.get('/get', async(req,res)=>{
    const collection = await connectMongodb();
    let { accion } = req.query;
    res.status(200).send(await collection.find().project().toArray())
})
user.delete('/:id', async(req,res)=>{
    const collection = await connectMongodb();
    let {id} = req.params;
    try{
        res.status(400).send(await collection.deleteOne({_id: new ObjectId(id)}))
    }catch(error){
        res.status(404).send({message: "User not found"})
    }
})
user.post('/', express.json(), async(req, res)=>{
    const collection = await connectMongodb();
    let data = req.body;
    try{
        res.status(400).send(await collection.insertOne(data))
    }catch{
        res.status(204).send({message: "User not created"})
    }
})
user.put("/:id", express.json(), async(req, res)=>{
    const collection = await connectMongodb();
    let data = req.body;
    let {id} = req.params;
    try{
        res.status(201).send(await collection.updateOne({_id: new ObjectId(id)}, {$set: data}));
    }catch(error){
        res.status(400).send({message: "User not updated"})
    }
})
let config = { 
    port: "5000",
    host: "localhost"
}
user.listen(config, ()=>{
    console.log(`http://localhost:5000`);
})

module.exports = user;
