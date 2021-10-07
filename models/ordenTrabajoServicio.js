const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')

const ordenTrabajoServicio = sequelize.define('orden_trabajo_servicio', {
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
    precio: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return Moment(this.getDataValue('createdAt')).format('LLLL')
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return Moment(this.getDataValue('updatedAt')).format('LLLL')
        }
    },
    deletedAt: {
        type: Sequelize.DATE,
        get() {
            return Moment(this.getDataValue('deletedAt')).format('LLLL')
        }
    },
})

module.exports = ordenTrabajoServicio