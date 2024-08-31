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
}
