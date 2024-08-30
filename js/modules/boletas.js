const { log } = require('console');
const connect = require('../../db/connect/connect');
module.exports = class boletas extends connect {
    collectionTicket;
    collectionUser;
    constructor(){
        super();
    }
    async buyTickets(){
        try {
            await this.open();
                this.collectionTicket = this.db.collection("funciones");
                this.collectionUser = this.db.collection("usuarios");
                let res = await this.collectionTicket.find({}).project({asientos: 1, pelicula_id: 1, hora_inicio: 1, hora_fin: 1, fecha: 1}).toArray();
                let show = res[0].asientos
                let asiento = res[0].asientos[0].estado;
                if (asiento == 'Libre'){
                    await this.collectionTicket.updateOne(
                        { "asientos._id": asiento._id },
                        { $set: { "asientos.$.estado": "Ocupado" } }
                    );
                    return  {message: "Compra exitosa", res, show}
                    } else {
                    return {message: "El asiento ya esta ocupado"}
                    }
                }
            catch (error) {
                console.error("Error al comprar el ticket:", error); 
                throw error;
                }

    }
}