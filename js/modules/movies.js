const connect = require('../../db/connect/connect');
module.exports = class product extends connect {
    collectionMovie;
    constructor(){
        super();
    }
    async getAllMovies(){
            await this.open();
            this.collectionMovie = this.db.collection("peliculas");
            let res = await this.collectionMovie.find({}).project({_id: 0}).toArray();
            if (res.acknowledged) {
                console.log("¡ Consulta exitosa !");
            } else {
                console.log("Hubo un problema al hacer la consulta.");
            }
             return res;
        } catch (error) {
            console.error("Error al buscar el dato:", error);
        }
    async getAllMoviesByParam(params){
        await this.open();
        this.collectionMovie = this.db.collection("peliculas");
        let res = await this.collectionMovie.find(params.filter).project(params.project).toArray();
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
