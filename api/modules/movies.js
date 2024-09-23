const connect = require('../../db/connect/connect');
module.exports = class product extends connect {
    collectionMovie;
    constructor(){
        super();
    }
/**
 * Obtiene todas las películas de la colección "peliculas".
 * 
 * @async
 * @function
 * @returns {Promise<Array>} - Una promesa que se resuelve en un array de documentos de películas con el campo `_id` excluido.
 * 
 * @throws {Error} - Lanza un error si hay un problema al conectar con la base de datos o al realizar la consulta.
 * 
 * @description
 * Abre una conexión a la base de datos, consulta la colección "peliculas" para recuperar todos los documentos de películas, 
 * y excluye el campo `_id` de los resultados. La función espera a que la consulta se complete, maneja cualquier error potencial 
 * y registra el resultado de la consulta.
 */
    async getAllMovies() {
        try {
            await this.open(); // Abre la conexión con la base de datos
            this.collectionMovie = this.db.collection("peliculas"); // Selecciona la colección "peliculas"
            let res = await this.collectionMovie.find({}).project({ _id: 0 }).toArray(); // Recupera todos los documentos, excluyendo el campo `_id`
            
            console.log("¡Consulta exitosa!"); // Registra un mensaje de éxito
            return res; // Retorna el resultado de la consulta

        } catch (error) {
            console.error("Error al buscar el dato:", error); // Registra cualquier error que ocurra
            throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
        }
    }
    /**
 * Recupera películas de la colección "peliculas" basadas en los parámetros de filtro y proyección especificados.
 * 
 * @async
 * @function
 * @param {Object} params - Los parámetros para consultar la base de datos.
 * @param {Object} params.filter - Los criterios de filtro a aplicar en la consulta.
 * @param {Object} params.project - Los campos a incluir o excluir en los resultados.
 * @returns {Promise<Array>} - Una promesa que se resuelve en un array de documentos de películas que coinciden con los criterios de filtro y proyección.
 * 
 * @throws {Error} - Lanza un error si hay un problema al conectar con la base de datos o al realizar la consulta.
 * 
 * @description
 * Abre una conexión a la base de datos, consulta la colección "peliculas" usando los parámetros de filtro y proyección proporcionados, 
 * y recupera los documentos que coinciden con los criterios. La función espera a que la consulta se complete, maneja cualquier error potencial, 
 * y registra el resultado de la consulta.
 */
    async getAllMoviesByParam(params) {
        try {
            await this.open(); // Abre la conexión con la base de datos
            this.collectionMovie = this.db.collection("peliculas"); // Selecciona la colección "peliculas"
            let res = await this.collectionMovie.find(params.filter).project(params.project).toArray(); // Recupera documentos basados en el filtro y la proyección
            
            console.log("¡Consulta exitosa!"); // Registra un mensaje de éxito
            return res; // Retorna el resultado de la consulta

        } catch (error) {
            console.error("Error al buscar el dato:", error); // Registra cualquier error que ocurra
            throw error; // Lanza el error para que pueda ser manejado en otro lugar si es necesario
            }
        }
}
