const {connectMongodb} = require('../connect/connect')
const express = require('express');
const cors = require('cors');
const user = express();

user.use(cors({
  origin: 'http://localhost:5173'
}));

user.get('/getMovie', async (req, res) => {
    const db = await connectMongodb();
    const collection = db.collection('peliculas')
    let { accion } = req.query;
    res.status(200).send(await collection.find().project().toArray())
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
user.post('/loginUser', async (req, res) => {
    const db = await connectMongodb();
    const collection = db.collection('usuarios');

    const { Username, Password } = req.body;

    try {
        const user = await collection.findOne({ Username });
        if (!user) {
            return res.status(400).send({ message: 'Credenciales inválidas' });
        }
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Credenciales inválidas' });
        }
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error del servidor' });
    }
});
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
user.post('/reserveSeats', express.json(), async (req, res) => {
    const { pelicula_id, fecha, hora_inicio, asientosSeleccionados } = req.body;
    if (!pelicula_id || !fecha || !hora_inicio || !asientosSeleccionados) {
        return res.status(400).json({ message: "pelicula_id, fecha, hora_inicio, and asientosSeleccionados are required" });
    }

    try {
        await this.open();
        const collectionTicket = this.db.collection("funciones");
        let peliculaObjectId;
        try {
            peliculaObjectId = new ObjectId(pelicula_id);
        } catch (error) {
            return res.status(400).json({ message: "ID de película no válido." });
        }
        let funcion = await collectionTicket.findOne({
            pelicula_id: peliculaObjectId,
            fecha: new Date(fecha),
            hora_inicio: hora_inicio
        });
        if (!funcion) {
            return res.status(404).json({ message: "Función no encontrada." });
        }
        let asientosDisponibles = funcion.asientos.filter(asiento =>
            asientosSeleccionados.includes(asiento.asiento) && asiento.estado === "Libre"
        );
        if (asientosDisponibles.length !== asientosSeleccionados.length) {
            return res.status(400).json({ message: "Los asientos se encuentran reservados." });
        }

        await collectionTicket.updateMany(
            { _id: funcion._id, "asientos.asiento": { $in: asientosSeleccionados } },
            { $set: { "asientos.$[elem].estado": "Reservado" } },
            { arrayFilters: [{ "elem.asiento": { $in: asientosSeleccionados } }] }
        );
        funcion = await collectionTicket.findOne({ _id: funcion._id });

        return res.status(200).json({ message: "Compra exitosa", funcion });
    } catch (error) {
        console.error("Error al comprar el ticket:", error);
        return res.status(500).json({ message: "Error al procesar la reserva" });
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
