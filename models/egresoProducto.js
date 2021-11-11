const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const EgresoProducto = sequelize.define('egreso_producto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  egreso_id: {
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

module.exports = EgresoProducto