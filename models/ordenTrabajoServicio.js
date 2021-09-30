const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')

const ordenTrabajoServicio = sequelize.define('orden_trabajo_Servicio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    servicio_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    orden_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantidad: {  
        type: Sequelize.INTEGER,
        allowNull: false,
      },
})

module.exports = ordenTrabajoServicio