const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')

const ordenTrabajo = sequelize.define('orden_trabajo', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    fecha_entrega: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_entrega: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo_pago: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio: {
        type: Sequelize.INTEGER,
        allowNull: false
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

module.exports = ordenTrabajo