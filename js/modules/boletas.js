const { log, group } = require('console');
const connect = require('../../db/connect/connect');
module.exports = class boletas extends connect {
    collectionTicket;
    collectionUser;
    constructor(){
        super();
    }
    /**
 * Gestiona la compra de boletos para una proyección específica.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto con el resultado de la compra.
 * 
 * @throws {Error} - Lanza un error si hay un problema al conectar con la base de datos, al realizar la consulta,
 *                    o al actualizar el estado del asiento.
 * 
 * @description
 * Esta función realiza las siguientes acciones:
 * 
 * 1. **Abrir Conexión a la Base de Datos**: Establece una conexión con la base de datos MongoDB.
 * 2. **Obtener Referencias a las Colecciones**: Se obtienen las referencias a las colecciones `funciones` y `usuarios`.
 * 3. **Consultar la Colección `funciones`**: Realiza una consulta a la colección `funciones` para obtener todos los documentos.
 * 4. **Procesar los Resultados**: Extrae los detalles de los asientos del primer resultado y verifica el estado del primer asiento.
 * 5. **Verificar Disponibilidad del Asiento**: Comprueba si el primer asiento está disponible (`Libre`).
 * 6. **Actualizar el Estado del Asiento**: Si el asiento está libre, se actualiza su estado a `Ocupado`.
 * 7. **Retornar Respuesta**: Devuelve un objeto con un mensaje de éxito y detalles de la proyección si la compra fue exitosa, 
 *    o un mensaje indicando que el asiento ya está ocupado.
 * 8. **Manejo de Errores**: Captura y maneja cualquier error que ocurra durante el proceso, registrándolo en la consola y lanzándolo.
 */
async buyTickets() {
    try {
        // ### Abrir Conexión a la Base de Datos ###
        // Establecer conexión con la base de datos
        await this.open();
        
        // ### Obtener Referencias a las Colecciones ###
        // Obtener referencia a las colecciones 'funciones' y 'usuarios'
        this.collectionTicket = this.db.collection("funciones");
        this.collectionUser = this.db.collection("usuarios");
        
        // ### Consultar la Colección 'funciones' ###
        // Realizar una consulta para obtener todos los documentos con los campos necesarios
        let res = await this.collectionTicket.find({})
            .project({
                asientos: 1, 
                pelicula_id: 1, 
                hora_inicio: 1, 
                hora_fin: 1, 
                fecha: 1
            })
            .toArray();
        
        // ### Procesar los Resultados ###
        // Extraer la lista de asientos y el estado del primer asiento
        let show = res[0].asientos; // Lista de asientos
        let asiento = res[0].asientos[0].estado; // Estado del primer asiento
        
        // ### Verificar Disponibilidad del Asiento ###
        // Verificar si el primer asiento está libre
        if (asiento === 'Libre') {
            // ### Actualizar el Estado del Asiento ###
            // Cambiar el estado del asiento a 'Ocupado'
            await this.collectionTicket.updateOne(
                { "asientos._id": res[0].asientos[0]._id },
                { $set: { "asientos.$.estado": "Ocupado" } }
            );
            
            // ### Retornar Respuesta de Éxito ###
            // Devolver un objeto con el mensaje de éxito y los detalles de la proyección
            return { message: "Compra exitosa", res, show };
        } else {
            // ### Retornar Mensaje de Asiento Ocupado ###
            // Devolver un objeto con un mensaje indicando que el asiento ya está ocupado
            return { message: "El asiento ya está ocupado" };
        }
    } catch (error) {
        // ### Manejo de Errores ###
        // Capturar y registrar cualquier error que ocurra durante el proceso
        console.error("Error al comprar el ticket:", error); 
        throw error;
        }   
    }
    /**
 * Verifica la disponibilidad de asientos para las funciones de cine.
 * 
 * @async
 * @function
 * @returns {Promise<Array>} - Una promesa que se resuelve en un array de objetos. Cada objeto representa una función de cine 
 *                             e incluye los asientos libres y las filas correspondientes.
 * 
 * @throws {Error} - Lanza un error si ocurre un problema al conectar con la base de datos o al ejecutar la consulta.
 * 
 * @description
 * Esta función realiza las siguientes acciones:
 * 
 * 1. **Abrir Conexión a la Base de Datos**: Establece una conexión con la base de datos MongoDB.
 * 2. **Obtener Referencia a la Colección `funciones`**: Se obtiene la referencia a la colección `funciones`.
 * 3. **Descomponer Array de Asientos**: Utiliza `$unwind` para descomponer el array de asientos en documentos individuales.
 * 4. **Filtrar Asientos Disponibles**: Filtra los asientos que están en estado `Libre` utilizando `$match`.
 * 5. **Agrupar los Resultados**: Agrupa los resultados por función, creando un array de asientos libres y filas correspondientes para cada función.
 * 6. **Retornar la Disponibilidad de Asientos**: Devuelve un array con la disponibilidad de asientos y sus respectivas filas para cada función.
 *
 */
async checkSeatAvailability() {
    await this.open();
    this.collection = this.db.collection("funciones");

    const res = await this.collection.aggregate([
        {
            $unwind: "$asientos" // Descompone el array de asientos
        },
        {
            $match: {
                "asientos.estado": "Libre" // Filtra solo los asientos que están en estado 'Libre'
            }
        },
        {
            $group: {
                _id: "$_id",
                asientos_libres: {
                    $push: "$asientos.asiento" // Agrega el número de asiento al array asientos_libres
                },
                fila_asiento_libre: {
                    $push: "$asientos.fila" // Agrega la fila al array filas
                }
            }
        }
    ]).toArray();    
    return ("Asientos disponibles", res)
}

}