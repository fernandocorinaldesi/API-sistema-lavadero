const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')

const Servicio = sequelize.define('servicio', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    precio_proveedor: {
        type: Sequelize.INTEGER,
        allowNull: true
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

module.exports = Servicio