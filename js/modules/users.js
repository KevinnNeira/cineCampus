const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class user extends connect {
    collectionUsers;
    dbAdministrador;
    constructor(){
        super();
    }
 /**
 * @function postUser
 * @description Inserta un nuevo usuario en la colección 'usuarios' y crea un usuario en el sistema con roles en la base de datos.
 * @param {Object} param - Objeto que contiene los datos del usuario a insertar (nombre, Nro_identificacion, correo, tipo_tarjeta, contraseña, nick, rol).
 * @returns {Object} res - Resultado de la operación de inserción, incluyendo el _id del nuevo usuario, un mensaje de éxito y las credenciales del usuario creado.
 * @throws {Error} - Lanza un error si la inserción o creación del usuario en el sistema de roles falla.
 */
 async postUser(param) {
    if (param) {
        let rol = "superAdminCine";  // Rol que asignarás al usuario
        let db = "cineCampus";
        
        // Abre la conexión con la base de datos
        await this.open();
        
        // Accede a la base de datos directamente para ejecutar el comando
        await this.dbAdministrador.command({
            createUser: param.nick,
            pwd: param.contraseña,
            roles: [
                { role: rol, db: db }
            ]
        });
        
        // Define la colección 'usuarios'
        this.dbAdministrador = this.db.collection('usuarios');
        
        // Inserta el nuevo usuario en la colección
        let res = await this.dbAdministrador.insertOne({
            nombre: param.nombre,
            Nro_identificacion: param.Nro_identificacion,
            correo: param.correo,
            tipo_tarjeta: param.tipo_tarjeta,
            contraseña: param.contraseña,
            nick: param.nick
        });
        
        // Devuelve el resultado con un mensaje de éxito
        res.message = "Usuario añadido exitosamente";
        res.credention = `${param.nick}:${param.contraseña}`;
        
        return res;
    } else {
        return { "error": "El tipo de usuario ingresado no existe" };
    }
}
/**
 * @function getInfoUsers
 * @description Obtiene la información básica (nombre y tipo de tarjeta) de todos los usuarios en la colección 'usuarios'.
 * @returns {Array} res - Array con los documentos de usuarios que contienen solo los campos 'nombre' y 'tipo_tarjeta'.
 * @throws {Error} - Lanza un error si ocurre algún problema durante la obtención de los datos.
 */
    async getInfoUsers() {
        await this.open();  // Abre la conexión a la base de datos.
        this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
        
        let res = await this.collectionUsers.find({}).project({nombre: 1, tipo_tarjeta: 1}).toArray();
                        
        return res;  // Retorna el array de usuarios.
    }
/**
 * @function updateUsers
 * @description Actualiza un usuario en la colección 'usuarios' basado en un filtro.
 * @param {Object} filter - Filtro para identificar el documento del usuario a actualizar.
 * @param {Object} updateUser - Objeto con los campos y valores a actualizar.
 * @returns {Object} res - Resultado de la operación de actualización, incluyendo el número de documentos modificados.
 * @throws {Error} - Lanza un error si la actualización falla.
 */
    async updateUsers(filter, updateUser) {
        try {
            await this.open();  // Abre la conexión a la base de datos.
            this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
            
            let res = await this.collectionUsers.updateOne(filter,updateUser);  // Actualiza el usuario basado en el filtro.
            
            if (res.acknowledged) {
                console.log("El usuario se actualizó correctamente.");  // Mensaje de éxito.
            } else {
                console.log("Hubo un problema al actualizar el Usuario.");  // Mensaje de error.
            }
            
            return res;  // Retorna el resultado de la operación.
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);  // Captura y muestra el error.
        }
    }
/**
 * @function getRolUsers
 * @description Obtiene los usuarios que tienen el tipo de tarjeta 'Vip' y muestra solo su 'nombre' y 'tipo_tarjeta'.
 * @returns {Array} res - Array con los documentos de usuarios que tienen el tipo de tarjeta 'Vip', incluyendo solo los campos 'nombre' y 'tipo_tarjeta'.
 * @throws {Error} - Lanza un error si ocurre algún problema durante la obtención de los datos.
 */
    async getRolUsers() {
        await this.open();  // Abre la conexión a la base de datos.
        this.collectionUsers = this.db.collection("usuarios");  // Selecciona la colección 'usuarios'.
        
        let res = await this.collectionUsers.find({ tipo_tarjeta: "Vip" }).project({ nombre: 1, tipo_tarjeta: 1 }).toArray();  // Convierte el cursor en un array.
                        
        return res;  // Retorna el array de usuarios con tipo de tarjeta 'Vip'.
    }
}