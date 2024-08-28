# Cine Campus



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

