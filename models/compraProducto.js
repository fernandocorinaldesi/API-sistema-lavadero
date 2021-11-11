const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const CompraProducto = sequelize.define('compra_producto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  compra_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  producto_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  producto_nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  cantidad: {
    type: Sequelize.INTEGER,
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

module.exports = CompraProducto