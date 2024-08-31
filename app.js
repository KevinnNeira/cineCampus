let reservation = require('./js/modules/reservas');
let obj = new reservation();

let pelicula_id = "66d05a83b06d8dfb19429687"; // ID de la película
let fecha = "1970-01-04T00:00:00.001Z"; // Fecha de la función
let hora_inicio = "11:00:00"; // Hora de inicio de la función
let asientosSeleccionados = [20]; // Asientos que se desean reservar

obj.reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
