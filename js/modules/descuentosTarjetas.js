const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class card extends connect {
    collectionCards;
    collectionFunction;
    constructor(){
        super();
    }
    async applyDiscounts(_id_usuario){
        await this.open(); // Abre la conexión con la base de datos
        this.collectionCards = this.db.collection("usuarios");
        this.collectionFunction = this.db.collection("funciones"); // Selecciona la colección "usuarios"
        let res = await this.collectionCards.find({_id: _id_usuario}).project({tipo_tarjeta: 1}).toArray();
        let tipoTarjeta = res[0].tipo_tarjeta
        if (tipoTarjeta == "Vip"){
                let consultaDescuento = await this.collectionFunction.find().project({asientos: 1}).toArray();
                let asiento = consultaDescuento[0].asientos[0].precio;
                let precioDescuento = asiento - (asiento/100)*5
                return {message: "Se le ha aplicado un descuento del 5% por hacer uso de su tarjeta vip", precioDescuento}
        }else{
            tipoTarjeta == "Estandar"
            let consultaDescuento = await this.collectionFunction.find().project({asientos: 1}).toArray();
            let asiento = consultaDescuento[0].asientos[0].precio;
            return {message: "El precio de la funcion es de:",asiento}
        }
        
    }
}