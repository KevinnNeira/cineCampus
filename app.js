let reservation = require('./js/modules/reservas');
let obj = new reservation();


obj.reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });
