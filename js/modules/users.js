const connect = require('../../db/connect/connect');
const {ObjectId} = require ('mongodb')
module.exports = class user extends connect {
    collectionUsers;;
    constructor(){
        super();
    }
    async postUser() {
        await this.open();
        this.collectionUsers = this.db.collectionUsers("usuarios")
        let res = await this.collectionUsers.createUser({})
    }
    async getInfoUsers(){
        await this.open();
        this.collectionUsers = this.db.collectionUsers("usuarios")
        let res = await this.collectionUsers.find({}).project({}).toArray();
    }
    async updateUsers(){
        await this.open();
        this.collectionUsers = this.db.collectionUsers("usuarios");
        let res = await this.collectionUsers.updateOne({});
    }
    async getRolUsers(){
        await this.open();
        this.collectionUsers = this.db.collection("usuarios");
        let res = await this.collectionUsers.find({tipo_tarjeta: "Vip"}).project({nombre: 1, tipo_tarjeta: 1}).toArray();
        return res
    }
}