let movie = require('./js/modules/movies')
const {ObjectId} = require ('mongodb')

let obj = new movie();

let params = {}
    params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
    params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}

obj.getAllMoviesByParam(params).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})