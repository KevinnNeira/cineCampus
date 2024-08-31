const connect = require('../../db/connect/connect');
const { ObjectId } = require('mongodb');

module.exports = class reservas extends connect {
    collectionTicket;
    constructor(){
        super();
    }

    async reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados){
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
            
    }
}
