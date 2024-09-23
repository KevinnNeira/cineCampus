const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class card extends connect {
    collectionCards;
    collectionFunction;
    constructor(){
        super();
    }
    /**
 * Aplica descuentos en función del tipo de tarjeta del usuario.
 * 
 * @param {string} _id_usuario - El identificador del usuario cuyo descuento se aplicará.
 * @returns {Promise<{message: string, precioDescuento?: number, asiento?: number}>} - 
 *   Un objeto con un mensaje y el precio ajustado o el precio estándar según el tipo de tarjeta del usuario.
 * 
 * @NOTE
 *   - Abre una conexión con la base de datos y selecciona las colecciones necesarias.
 *   - Consulta la base de datos para obtener el tipo de tarjeta del usuario.
 *   - Dependiendo del tipo de tarjeta, calcula el precio con o sin descuento.
 */
async applyDiscounts(_id_usuario) {
    // Abre la conexión con la base de datos
    await this.open();
    
    // Selecciona las colecciones necesarias
    this.collectionCards = this.db.collection("usuarios");
    this.collectionFunction = this.db.collection("funciones");

    // Consulta el tipo de tarjeta del usuario
    let res = await this.collectionCards.find({_id: _id_usuario}).project({tipo_tarjeta: 1}).toArray();
    let tipoTarjeta = res[0].tipo_tarjeta;

    // Aplica descuento si el tipo de tarjeta es "Vip"
    if (tipoTarjeta === "Vip") {
        // Obtiene el precio actual del asiento
        let consultaDescuento = await this.collectionFunction.find().project({asientos: 1}).toArray();
        let asiento = consultaDescuento[0].asientos[0].precio;
        
        // Calcula el precio con un descuento del 5%
        let precioDescuento = asiento - (asiento / 100) * 5;
        
        return {
            message: "Se le ha aplicado un descuento del 5% por hacer uso de su tarjeta vip",
            precioDescuento
        };
    } else {
        // Asume que el tipo de tarjeta es "Estandar"
        // Obtiene el precio estándar del asiento
        let consultaDescuento = await this.collectionFunction.find().project({asientos: 1}).toArray();
        let asiento = consultaDescuento[0].asientos[0].precio;
        
        return {
            message: "El precio de la función es de:",
            asiento
            };
        }
    }
}