const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class user extends connect {
    collectionUsers;;
    constructor(){
        super();
    }
/**
 * @function postUser
 * @description Inserta un nuevo usuario en la colección 'usuarios'.
 * @param {Object} insertUser - Objeto que contiene los datos del usuario a insertar.
 * @returns {Object} res - Resultado de la operación de inserción, incluyendo el _id del nuevo usuario.
 * @throws {Error} - Muestra un error si la inserción falla.
 */
async postUser(insertUser) {
    try {         
        await this.open();  // Abre la conexión a la base de datos.
        this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
        
        let res = await this.collectionUsers.insertOne(insertUser);  // Inserta un nuevo usuario.
        
        if (res.acknowledged) {
            console.log("El usuario se insertó correctamente.");  // Success message.
        } else {
            console.log("Hubo un problema al insertar el Usuario.");  // Error message.
        }
        
        return res;  // Retorna el resultado de la operación.
    } catch (error) {
        console.error("Error al insertar el usuario:", error);  // Captura y muestra el error.
    }
}
/**
 * @function getInfoUsers
 * @description Obtiene la información básica (nombre, tipo de tarjeta) de todos los usuarios.
 * @returns {Array} res - Array con los documentos de usuarios que contienen solo los campos 'nombre' y 'tipo_tarjeta'.
 */
async getInfoUsers() {
    await this.open();  // Abre la conexión a la base de datos.
    this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
    
    let res = await this.collectionUsers.find({})  // Busca todos los documentos.
                      .project({nombre: 1, tipo_tarjeta: 1})  // Selecciona solo los campos 'nombre' y 'tipo_tarjeta'.
                      .toArray();  // Convierte el cursor en un array.
                      
    return res;  // Retorna el array de usuarios.
}
/**
 * @function updateUsers
 * @description Actualiza un usuario en la colección 'usuarios' basado en un filtro.
 * @param {Object} filter - Filtro para identificar el documento del usuario a actualizar.
 * @param {Object} updateUser - Objeto con los campos y valores a actualizar.
 * @returns {Object} res - Resultado de la operación de actualización, incluyendo el número de documentos modificados.
 * @throws {Error} - Muestra un error si la actualización falla.
 */
async updateUsers(filter, updateUser) {
    try {
        await this.open();  // Abre la conexión a la base de datos.
        this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
        
        let res = await this.collectionUsers.updateOne(filter, updateUser);  // Actualiza el usuario basado en el filtro.
        
        if (res.acknowledged) {
            console.log("El usuario se actualizó correctamente.");  // Success message.
        } else {
            console.log("Hubo un problema al actualizar el Usuario.");  // Error message.
        }
        
        return res;  // Retorna el resultado de la operación.
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);  // Captura y muestra el error.
    }
}
/**
 * @function getRolUsers
 * @description Obtiene los usuarios que tienen el rol de 'Vip'.
 * @returns {Array} res - Array con los documentos de usuarios que tienen el tipo de tarjeta 'Vip', incluyendo solo 'nombre' y 'tipo_tarjeta'.
 */
async getRolUsers() {
    await this.open();  // Abre la conexión a la base de datos.
    this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
    
    let res = await this.collectionUsers.find({tipo_tarjeta: "Vip"})  // Filtra los usuarios con tipo de tarjeta 'Vip'.
                      .project({nombre: 1, tipo_tarjeta: 1})  // Selecciona solo los campos 'nombre' y 'tipo_tarjeta'.
                      .toArray();  // Convierte el cursor en un array.
                      
    return res;  // Retorna el array de usuarios con tipo de tarjeta 'Vip'.
    }
}