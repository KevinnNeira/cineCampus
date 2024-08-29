let movie = require('./js/modules/movies')

let obj = new movie();
obj.getAllMovies().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})