let ticket = require('./js/modules/boletas')
const {ObjectId} = require ('mongodb')

let obj = new ticket();
obj.buyTickets().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})