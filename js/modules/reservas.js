const connect = require('../../db/connect/connect');
const { ObjectId } = require('mongodb');

module.exports = class reservas extends connect {
    collectionTicket;
    constructor(){
        super();
    }

    async reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados){
        try {
            await this.open();
            this.collectionTicket = this.db.collection("funciones");
            let peliculaObjectId;
            try {
                peliculaObjectId = new ObjectId(pelicula_id);
            } catch (error) {
                return { message: "ID de película no válido." };
            }
            let funcion = await this.collectionTicket.findOne({
                pelicula_id: peliculaObjectId,
                fecha: new Date(fecha),
                hora_inicio: hora_inicio
            });
            if (!funcion) {
                return { message: "Función no encontrada." };
            }
            let asientosDisponibles = funcion.asientos.filter(asiento =>
                asientosSeleccionados.includes(asiento.asiento) && asiento.estado === "Libre"
            );
            if (asientosDisponibles.length !== asientosSeleccionados.length) {
                return { message: "Los asientos se encuentran reservados." };
            }
            await this.collectionTicket.updateMany(
                { _id: funcion._id, "asientos.asiento": { $in: asientosSeleccionados } },
                { $set: { "asientos.$[elem].estado": "Reservado" } },
                { arrayFilters: [{ "elem.asiento": { $in: asientosSeleccionados } }] }
            );
            funcion = await this.collectionTicket.findOne({ _id: funcion._id });
            return { message: "Compra exitosa", funcion };
        } catch (error) {
            console.error("Error al comprar el ticket:", error);
            throw error;
        }
    }
    async cancelSeatReservation(){
        await this.open();
        this.collectionTicket = this.db.collection("funciones");
        try {
            await this.open();
            this.collectionTicket = this.db.collection("funciones");
            let res = await this.collectionTicket.find({})
                .project({
                    asientos: 1, 
                    pelicula_id: 1, 
                    hora_inicio: 1, 
                    hora_fin: 1, 
                    fecha: 1
                })
                .toArray();
            let show = res[0].asientos;
            let asiento = res[0].asientos[0].estado;
            if (asiento === 'Reservado') {
                await this.collectionTicket.updateOne(
                    { "asientos._id": res[0].asientos[0]._id },
                    { $set: { "asientos.$.estado": "Libre" } }
                );
                return { message: "Reserva cancelada", res, show };
            } else {
                return { message: "El asiento ya está libre" };
            }
        } catch (error) {
            console.error("Error al cancelar la reserva:", error); 
            throw error;
            }   
        }
    }

