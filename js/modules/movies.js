const connect = require('../../db/connect/connect');
module.exports = class product extends connect {
    collectionMovie;
    constructor(){
        super();
    }
    async getAllMovies(){
            await this.open();
            this.collectionMovie = this.db.collection("peliculas");
            let res = await this.collectionMovie.find({}).project({}).toArray();
            if (res.acknowledged) {
                console.log("¡ Consulta exitosa !");
            } else {
                console.log("Hubo un problema al hacer la consulta.");
            }
            return res;
        } catch (error) {
            console.error("Error al buscar el dato:", error);
        }
    }