const { MongoClient } = require("mongodb");

module.exports = class Connect {
    connection;
    db;
    static instanceConnect;

    constructor() {
        if (Connect.instanceConnect) return Connect.instanceConnect;
        Connect.instanceConnect = this;
        return Connect.instanceConnect;
    }

    async open() {
        const uriUsuarios = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/ligaBetPlay`;
        const uriCampus = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        const uriHome = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
        console.log(uriCampus)

        try {
            this.connection = new MongoClient(uriCampus); 
            await this.connection.connect();
            this.db = this.connection.db('cineCampus');
        } catch (error) {
            console.error("Error al conectarse a MongoDB:", error.message);
            this.connection = null;
        }
    }
};