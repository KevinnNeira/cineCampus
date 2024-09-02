let movie = require('./js/modules/movies')
let ticket = require('./js/modules/boletas')
const {ObjectId} = require ('mongodb')
let params = {}
params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}


const Reservation = require('./js/modules/reservas');
(async () => {
    try {
        let reservation = new Reservation();
        const pelicula_id = '66d05a83b06d8dfb19429687'; // Reemplaza con el ID de la película que necesites
        const asientoNumero = 20; // Remplaza por el numero de id de asiento
        let result = await reservation.cancelSeatReservation(pelicula_id, asientoNumero);
        console.log(result);
    } catch (error) {
        console.error("Error al cancelar la reserva:", error);
    }
})();
