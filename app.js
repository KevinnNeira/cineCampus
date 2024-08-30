let movie = require('./js/modules/movies')
let ticket = require('./js/modules/boletas')

const {ObjectId} = require ('mongodb')

let obj = new ticket();

let params = {}
    params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
    params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}

obj.checkSeatAvailability().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})