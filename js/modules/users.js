const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class user extends connect {
    collectionUsers;;
    constructor(){
        super();
    }
    async postUser(insertUser) {
        try {         
        await this.open();
        this.collectionUsers = this.db.collection("usuarios")
        let res = await this.collectionUsers.insertOne(insertUser)
        if (res.acknowledged) {
            console.log("El usuario se insertó correctamente.");
        } else {
            console.log("Hubo un problema al insertar el Usuario.");
        }
        return res;
    } catch (error) {
        console.error("Error al insertar el usuario:", error);
    }
}
    async getInfoUsers(){
        await this.open();
        this.collectionUsers = this.db.collection("usuarios")
        let res = await this.collectionUsers.find({}).project({nombre: 1, tipo_tarjeta: 1}).toArray();
        return res
    }
    async updateUsers(filter, updateUser){
        try{
        await this.open();
        this.collectionUsers = this.db.collection("usuarios");
        let res = await this.collectionUsers.updateOne(filter, updateUser);
        if (res.acknowledged) {
            console.log("El usuario se actualizo correctamente.");
        } else {
            console.log("Hubo un problema al actualizazo el Usuario.");
        }
        return res;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        }
    }
    async getRolUsers(){
        await this.open();
        this.collectionUsers = this.db.collection("usuarios");
        let res = await this.collectionUsers.find({tipo_tarjeta: "Vip"}).project({nombre: 1, tipo_tarjeta: 1}).toArray();
        return res
    }
}