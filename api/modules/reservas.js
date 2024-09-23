const connect = require('../../db/connect/connect');
const { ObjectId } = require('mongodb');

module.exports = class reservas extends connect {
    collectionTicket;
    constructor(){
        super();
    }
    /**
 * @function reserveSeats
 * 
 * @description
 * **Reserva asientos para una función específica.**
 * 
 * @param {string} pelicula_id - El ID de la película para la cual se realizará la reserva.
 * @param {string} fecha - La fecha de la función en formato "YYYY-MM-DD".
 * @param {string} hora_inicio - La hora de inicio de la función en formato "HH:MM:SS".
 * @param {Array<number>} asientosSeleccionados - Lista de números de asientos que se desean reservar.
 * 
 * @returns {Promise<Object>} - Devuelve un objeto que contiene un mensaje de éxito o error, y los detalles de la función.
 * 
 * @example
 *let pelicula_id = "66cf1a5f2052736384fa8a7f"; // ID de la funcion
 *let fecha = "1970-01-01T00:00:00.001+00:00"; // Fecha de la función
 *let hora_inicio = "3:00:00"; // Hora de inicio de la función
 *let asientosSeleccionados = [6]; // Asientos que se desean reservar
 * 
 * obj.reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados)
 *    .then(response => {
 *        console.log(response);
 *    })
 *    .catch(err => {
 *        console.error(err);
 *    });
 * 
 * @throws {Error} - Si ocurre un error durante el proceso de reserva.
 */
async reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados){
    try {
        // * Abre la conexión a la base de datos
        await this.open();
        this.collectionTicket = this.db.collection("funciones");

        // * Convierte el ID de la película a ObjectId
        let peliculaObjectId;
        try {
            peliculaObjectId = new ObjectId(pelicula_id);
        } catch (error) {
            return { message: "ID de película no válido." };
        }

        // * Busca la función específica basada en el ID de la película, fecha y hora de inicio
        let funcion = await this.collectionTicket.findOne({
            pelicula_id: peliculaObjectId,
            fecha: new Date(fecha),
            hora_inicio: hora_inicio
        });

        // * Verifica si la función existe
        if (!funcion) {
            return { message: "Función no encontrada." };
        }

        // * Filtra los asientos que están disponibles (estado 'Libre') y que coinciden con los asientos seleccionados
        let asientosDisponibles = funcion.asientos.filter(asiento =>
            asientosSeleccionados.includes(asiento.asiento) && asiento.estado === "Libre"
        );

        // * Verifica si todos los asientos seleccionados están disponibles
        if (asientosDisponibles.length !== asientosSeleccionados.length) {
            return { message: "Los asientos se encuentran reservados." };
        }

        // * Actualiza el estado de los asientos seleccionados a 'Reservado'
        await this.collectionTicket.updateMany(
            { _id: funcion._id, "asientos.asiento": { $in: asientosSeleccionados } },
            { $set: { "asientos.$[elem].estado": "Reservado" } },
            { arrayFilters: [{ "elem.asiento": { $in: asientosSeleccionados } }] }
        );

        // * Recupera la función actualizada para devolverla en la respuesta
        funcion = await this.collectionTicket.findOne({ _id: funcion._id });

        // * Devuelve un objeto con un mensaje de éxito y los detalles de la función
        return { message: "Compra exitosa", funcion };
    } catch (error) {
        // * Captura y registra cualquier error que ocurra durante el proceso de reserva
        console.error("Error al comprar el ticket:", error);
        throw error;
    }
}
/**
 * @function cancelSeatReservation
 * 
 * @description
 * **Cancela la reserva de un asiento específico para una función determinada.**
 * 
 * @param {string} pelicula_id - El ID de la película para la cual se desea cancelar la reserva.
 * @param {number} asientoNumero - El número del asiento que se desea cancelar la reserva.
 * 
 * @returns {Promise<Object>} - Devuelve un objeto que contiene un mensaje de éxito o error, y los detalles de la función.
 * 
 * @example
 * let pelicula_id = "66cf1a5f2052736384fa8a7f"; // ID de la película
 * let asientoNumero = 20; // Número del asiento a cancelar
 * 
 * obj.cancelSeatReservation(pelicula_id, asientoNumero)
 *    .then(response => {
 *        console.log(response);
 *    })
 *    .catch(err => {
 *        console.error(err);
 *    });
 * 
 * @throws {Error} - Si ocurre un error durante el proceso de cancelación.
 */
async cancelSeatReservation(pelicula_id, asientoNumero) {
    try {
        // * Abre la conexión a la base de datos
        await this.open();
        this.collectionTicket = this.db.collection("funciones");

        // * Convierte el ID de la película a ObjectId
        let peliculaObjectId;
        try {
            peliculaObjectId = new ObjectId(pelicula_id);
        } catch (error) {
            return { message: "ID de película no válido." };
        }

        // * Encuentra la función correspondiente con el ID de la película y el número de asiento
        let funcion = await this.collectionTicket.findOne({
            pelicula_id: peliculaObjectId,
            "asientos.asiento": asientoNumero
        });

        // * Verifica si la función existe
        if (!funcion) {
            return { message: "Función no encontrada." };
        }

        // * Encuentra el asiento específico en la función
        let asiento = funcion.asientos.find(asiento => asiento.asiento === asientoNumero);

        // * Verifica si el asiento está reservado
        if (asiento && asiento.estado === 'Reservado') {
            // * Actualiza el estado del asiento a 'Libre'
            await this.collectionTicket.updateOne(
                { _id: funcion._id, "asientos.asiento": asientoNumero },
                { $set: { "asientos.$.estado": "Libre" } }
            );

            // * Devuelve un objeto con un mensaje de éxito y los detalles de la función
            return { message: "Reserva cancelada exitosamente", funcion };
        } else if (asiento && asiento.estado === 'Libre') {
            // * Retorna un mensaje si el asiento ya está libre
            return { message: "El asiento ya está libre" };
        } else {
            // * Retorna un mensaje si el asiento no existe en la función
            return { message: "El asiento no existe en esta función." };
        }
    } catch (error) {
        // * Captura y registra cualquier error que ocurra durante el proceso de cancelación
        console.error("Error al cancelar la reserva:", error);
        throw error;
        }
    }
}