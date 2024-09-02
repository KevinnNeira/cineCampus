let movie = require('./js/modules/movies')
let ticket = require('./js/modules/boletas')
const {ObjectId} = require ('mongodb')
let params = {}
params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}


const Reservation = require('./js/modules/reservas'); // Ajusta la ruta según la estructura de tu proyecto
(async () => {
    try {
        // Crear una instancia de la clase reservas
        let reservation = new Reservation();

        // Define el ID de la película y el número de asiento que deseas cancelar
        const pelicula_id = '66d05a83b06d8dfb19429687'; // Reemplaza con el ID de la película que necesites
        const asientoNumero = 20; // Reemplaza con el número del asiento que necesites cancelar

        // Llama a la función cancelSeatReservation y pasa los parámetros necesarios
        let result = await reservation.cancelSeatReservation(pelicula_id, asientoNumero);

        // Muestra el resultado en la consola
        console.log(result);
    } catch (error) {
        console.error("Error al cancelar la reserva:", error);
    }
})();
