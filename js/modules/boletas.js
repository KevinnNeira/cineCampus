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
                this.collectionTicket = this.db.collection("funcion");
                this.collectionUser = this.db.collection("usuarios");
                let res = await this.collectionTicket.find({}).project({ _id: 0}).toArray();
                let asiento = res[0].asientos[0].estado;
                console.log("¡Compra exitosa!");
                if (asiento == 'Libre'){
                let resUser = await this.collectionUser.find({}).project({ _id: 0,}).toArray();
                return resUser
            }
            } catch (error) {
                console.error("Error al buscar el dato:", error); 
                throw error;
            }
        }
}