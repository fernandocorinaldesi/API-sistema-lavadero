const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')

const Stock = sequelize.define('stock', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    producto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    producto_nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    producto_marca: {
        type: Sequelize.STRING,
        allowNull: true
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    proveedor: {
        type: Sequelize.STRING,
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

module.exports = Stock