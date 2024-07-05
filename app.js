const express = require('express');
const override = require ('method-override');
const rutasApp = require('./src/routes/aplicacionesRoute.js')

//Instanciación o inicializacion de la funcion express() dentro de la variable app  
const app = express();

//const session = require ('express-session') //levanto 

const port = 8080  || process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

/*app.use(session({ //inicializo la session
    secret:"S3cr3t_H@sh01",
    resave:false, // se debe reformular cada vez q se quiera conectar alguien 
    saveUninitialized: false, //no se pueda guardar una sesion sin login previo
}))*/

app.use(express.static(__dirname +'/public'));
app.use(express.urlencoded({extended: true}))

//app.use(express,express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

app.use(override('_metodo'))

app.use('/', rutasApp)

app.use((req, res, next) =>{
	res.status(404).send(`<h1 style="color: red">Recurso no encontrado!</h1>`)
})

app.listen(port, () => console.log(`Hola, puerto: ${port}`))

const { conn } = require('./src/db/db.js');

