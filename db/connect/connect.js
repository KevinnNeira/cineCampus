const { MongoClient } = require("mongodb");

module.exports = class Connect {
    connection;
    dbAdministrador;
    db;
    static instanceConnect;

    constructor() {
        if (Connect.instanceConnect) return Connect.instanceConnect;
        Connect.instanceConnect = this;
        return Connect.instanceConnect;
    }

    async open() {
        const uriUsuarios = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/admin`;
        const uriCampus = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        const uriHome = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        console.log(uriUsuarios)

        try {
            this.connection = new MongoClient(uriUsuarios); 
            await this.connection.connect();
            this.db = this.connection.db('cineCampus');
            this.dbAdministrador = this.connection.db("admin");
        } catch (error) {
            console.error("Error al conectarse a MongoDB:", error.message);
            this.connection = null;
        }
    }
};