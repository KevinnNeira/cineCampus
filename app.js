let movie = require('./js/modules/movies')
let ticket = require('./js/modules/boletas')
const Reservation = require('./js/modules/reservas');
let discounts = require('./js/modules/descuentosTarjetas')
const {ObjectId} = require ('mongodb')
let params = {}
params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}


let _id_usuario = new ObjectId('66d07e58b06d8dfb1942969c')
let obj = new discounts();
obj.applyDiscounts(_id_usuario).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
