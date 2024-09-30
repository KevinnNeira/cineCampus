const {connectMongodb} = require('../connect/connect')
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const user = express();

// Habilitar CORS para permitir solicitudes desde tu frontend (React)
user.use(cors({
  origin: 'http://localhost:5173' // Asegúrate de que este sea el puerto de tu frontend
}));

// Ruta para obtener películas
user.get('/getMovie', async (req, res) => {
    const db = await connectMongodb();
    const collection = db.collection('peliculas')
    let { accion } = req.query;
    return collection.findOne({ Username }).then(user => {
        if (!user) {
            return res.status(400).send({ message: 'Credenciales inválidas' });
        }

        // Comparar contraseña
        return bcrypt.compare(Password, user.contraseña).then(isMatch => {
            if (!isMatch) {
                return res.status(400).send({ message: 'Credenciales inválidas' });
            }
            return res.status(200).send({ message: 'Inicio de sesión exitoso' });
        });
    });
}).catch(error => {
    console.error(error);
    return res.status(500).send({ message: 'Error del servidor' });
});


user.post('/updateSeats', async (req, res) => {
    const db = await connectMongodb();
    const collection = db.collection('funciones');
    const { selectedSeats } = req.body;

    try {
        await collection.updateMany(
            { seatNumber: { $in: selectedSeats } },
            { $set: { status: 'Reservado' } }
        );

        res.status(200).send({ message: 'Asientos actualizados' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al actualizar los asientos' });
    }
});

user.delete('/:id', async(req,res)=>{
    const collection = await connectMongodb();
    let {id} = req.params;
    try{
        res.status(400).send(await collection.deleteOne({_id: new ObjectId(id)}))
    }catch(error){
        res.status(404).send({message: "User not found"})
    }
})
user.post('/insertUser', express.json(), async (req, res) => {
    const db = await connectMongodb();
    const collection = db.collection('usuarios')
    const { Username, Email, Password } = req.body;

    if (!Username || !Email || !Password) {
        return res.status(400).json({ message: "Username, Email and Password are required" });
    }

    const newUser = {
        Username,
        Email,
        Password
    };

    try {
        const result = await collection.insertOne(newUser);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User not created" });
    }
});

user.get("/:_id", express.json(), async(req, res)=>{
    const db = await connectMongodb();
    const collection = db.collection('peliculas')
    let {id} = req.params;
    try{
        res.status(201).send(await collection.findOne({_id: new ObjectId(id)}, ));
    }catch(error){
        res.status(400).send({message: "User not updated"})
    }
})
let config = { 
    port: "3000",
    host: "localhost"
}
user.listen(config, ()=>{
    console.log(`http://localhost:3000`);
})

module.exports = user;
