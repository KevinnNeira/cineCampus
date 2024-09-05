# Cine Campus

## Credenciales

```
Administrador

MONGO_PROTOCOLO=mongodb://
MONGO_USER=Administrador
MONGO_PSW=campus2023
MONGO_HOST=172.16.102.48
MONGO_PORT=27017


Usuario Estandar

MONGO_PROTOCOLO=mongodb://
MONGO_USER=usuarioEstandar
MONGO_PSW=campus2023
MONGO_HOST=172.16.102.48
MONGO_PORT=27017


Usuario Vip

MONGO_PROTOCOLO=mongodb://
MONGO_USER=usuarioVip
MONGO_PSW=campus2023
MONGO_HOST=172.16.102.48
MONGO_PORT=27017
```

#### Objetivo

Desarrollar una serie de APIs para la aplicación web de CineCampus utilizando MongoDB como base de datos. Las APIs deberán gestionar la selección de películas, la compra de boletos, la asignación de asientos, y la implementación de descuentos para tarjetas VIP, con soporte para diferentes roles de usuario.



#### Para inicializar 

Para inicializar el modulo se deben ingresar una serie de comandos en la consola

```
1. npm init -y

2. npm i mongodb

3. npm run dev
```



### 1. Selección de películas

- **API para Listar Películas:**  Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

```javascript
let movie = require('./js/modules/movies')
const {ObjectId} = require ('mongodb')

let obj = new movie();

obj.getAllMovies().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```



- **API para Obtener Detalles de Película:**  Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.

  **Nota:**  Si desea hacer la consulta a otra película cambie su _id dentro del filter.

```javascript
let movie = require('./js/modules/movies')
const {ObjectId} = require ('mongodb')

let obj = new movie();

let params = {}
	params.filter = { _id: new ObjectId('66d05a83b06d8dfb19429683') };
    params.project =  {_id: 0,nombre: 1, sinopsis: 1, estados: 1, duracion: 1}

obj.getAllMoviesByParam(params).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```
### 2. Compra de Boletos

- **API para Comprar Boletos:**  Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.

    **Nota:**  Verifique que el estado del asiento en la base de datos se encuentre en "Libre".

```javascript
let ticket = require('./js/modules/boletas')
const {ObjectId} = require ('mongodb')

let obj = new ticket();
obj.buyTickets().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```

- **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.

    **Nota:**  Todos los asientos que muestre son los que se encuntran disponibles junto con su respectiva fila

```javascript
let ticket = require('./js/modules/boletas')

const {ObjectId} = require ('mongodb')

let obj = new ticket();
obj.checkSeatAvailability().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```

### 3. Asignación de Asientos

- **API para Reservar Asientos:** Permitir la selección y reserva de asientos para una proyección específica.

    **Nota:**  Asegurese de estar pasando bien los parametros

```javascript
let reservation = require('./js/modules/reservas');
let obj = new reservation();

let pelicula_id = "66d05a83b06d8dfb19429687";
let fecha = "1970-01-04T00:00:00.001Z";
let hora_inicio = "11:00:00";
let asientosSeleccionados = [20];

obj.reserveSeats(pelicula_id, fecha, hora_inicio, asientosSeleccionados).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
```
 
 - **API para Cancelar Reserva de Asientos:** Permitir la cancelación de una reserva de asiento ya realizada.

    **Nota:**  Asegurese de que el estado del asiento se encuentre reservado para poder cancelar la reserva

```javascript
const Reservation = require('./js/modules/reservas');
(async () => {
    try {
        let reservation = new Reservation();
        const pelicula_id = '66d05a83b06d8dfb19429687';
        const asientoNumero = 20;
        let result = await reservation.cancelSeatReservation(pelicula_id, asientoNumero);
        console.log(result);
    } catch (error) {
        console.error("Error al cancelar la reserva:", error);
    }
})();
```

### 4. Descuentos y Tarjetas VIP

- **API para Aplicar Descuentos:** Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.
- **API para Verificar Tarjeta VIP:** Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.

    **Nota:** En _id_usuario ingrese el id del usuario que desee validar 

```javascript
let discounts = require('./js/modules/descuentosTarjetas')

let obj = new discounts();
let _id_usuario = new ObjectId('66d07e58b06d8dfb1942969c')

obj.applyDiscounts(_id_usuario).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```
### 5. Roles Definidos

- **Administrador:** Tiene permisos completos para gestionar el sistema, incluyendo la venta de boletos en el lugar físico. Los administradores no están involucrados en las compras en línea realizadas por los usuarios.
- **Usuario Estándar:** Puede comprar boletos en línea sin la intervención del administrador.
- **Usuario VIP:** Puede comprar boletos en línea con descuentos aplicables para titulares de tarjetas VIP.

- **API para Crear Usuario:** Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).

```javascript
let user = require('./js/modules/users')
let obj = new user();
let param = {
    nombre: "Andres",
    rol: 'readWrite',
    Nro_identificacion: 252523235233,
    correo: "angobeal777@gmail.com",
    tipo_tarjeta: "Vip",
    nick: "Gonzxx",
    contraseña: "bichiru"
};

obj.postUser(param).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```
- **API para Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.

```javascript
let user = require('./js/modules/users')
let obj = new user();
obj.getInfoUsers().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```
- **API para Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).
```javascript
let user = require('./js/modules/users')
let obj = new user();
let filter = new ObjectId('66d90698b1d6d9c131771f2c')
let updateUser = {
    $set: {
        nombre: "Andreaaas",
        Nro_identificacion: 252523235233,
        correo: "angobeal777@gmail.com",
        tipo_tarjeta: "Vip",
        nick: "Gonzxx",
        contraseña: "bichiru"
    }
}

obj.updateUsers({_id:filter}, updateUser).then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```
- **API para Listar Usuarios:** Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).

```javascript
let user = require('./js/modules/users')
let obj = new user();
obj.getRolUsers().then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
```