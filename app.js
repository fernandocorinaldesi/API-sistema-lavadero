// ###### FRAMEWORKS Y LIBRERIAS GENERALES
const express = require('express')
const bodyParser = require( 'body-parser')
//const db  = require('./database/mongooseConnection')
const utilsError = require('./utils/errorHandler')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const helmet = require("helmet")
const rateLimit = require('./utils/rateLimit')
///const conectToRedis =require('./database/redisConnection')
require('dotenv').config()

//const usuario = require('./models/usuario')

// ###### PASSPORT
const passport = require('passport')
require('./utils/passport')

// ###### RUTAS
const token  = require('./routes/core/token')
const usuarios = require('./routes/core/usuarios')
const ordenTrabajoRutas = require('./routes/ordenTrabajo')
const servicioRutas = require('./routes/servicio')
const clientes = require('./routes/clientes')
const productoRutas = require('./routes/producto')
const stockRutas = require('./routes/stock')
const compraRutas = require('./routes/compra')
const egresoRutas = require('./routes/egreso')
const contableRutas = require('./routes/contable')
const seguridadRutas = require('./routes/seguridad')



const PORT = process.env.PORT || 3001

// ###### INICIO EXPRESS
const app = express()

// ###### SET EXPRESS CUESTIONES GENERALES
app.use(helmet())
app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//app.use('/images', express.static(path.join(__dirname, 'images')))
app.use("/login",rateLimit);

//morgan+log file rotation
let accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotacion diaria
    path: path.join(__dirname, 'log')
  })
app.use(morgan('combined', { stream: accessLogStream }))



// ###### SET EXPRESS CORS PARA LA API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type','Authorization')
    next()
})
app.options('*', cors())

// ###### ENDPOINTS CORE
//app.use('/token', token)
app.use('/usuarios',usuarios)

// ###### ENDPOINTS APP
app.use('/orden', ordenTrabajoRutas)
app.use('/clientes', clientes)
app.use('/servicios', servicioRutas)
app.use('/productos', productoRutas)
app.use('/compras', compraRutas)
app.use('/stocks', stockRutas)
app.use('/egresos', egresoRutas)
app.use('/contable', contableRutas)
app.use('/seguridad', seguridadRutas)



// #####Swagger
/*if(process.env.NODE_ENV !== 'production') {
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
//#### HOMEPAGE
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});*/


// ###### ERROR HANDLER
app.use(utilsError.errorHandler)

//#### JSON WEB TOKEN ERROR HANDLER
app.use(utilsError.errorHandlerJWT);

//#### NOT FOUND ROUTE
app.use(utilsError.errorHandler404)
  
// ###### CONEXION A MONGO
//db.getConnection()

// ###### CONEXION A REDIS
//conectToRedis

/////////////////////////////////////////////
// Base de datos
// Relaciones y sincronización
/////////////////////////////////////////////

/*const sequelize = require('./database/sequelizeConnection')

sequelize.sync({ 
    schema: 'public', searchPath: 'public'
    , alter: true
})
.then(resultado => { console.log("\u001b[1;34m  [sequelize sync core]" + JSON.stringify(resultado.models)) })
.catch(error => { throw new Error(error) })

/*
const cliente = require("./models/cliente");
const cliente2 = require("./models/servicio");
/*db.sync({ 
    schema: 'gestion', searchPath: 'gestion'
    //, alter: true
})
.then(resultado => { console.log("\u001b[1;34m  [sequelize sync core]" + JSON.stringify(resultado.models)) })
.catch(error => { throw new Error(error) })
*/
//const Stock = require("./models/stock");

//const cliente = require("./models/compra");
//const cliente2 = require("./models/compraProducto");
/*const cliente = require("./models/egreso");
const cliente2 = require("./models/egresoProducto");*/
//const cliente2 = require("./models/servicio");



module.exports = app;