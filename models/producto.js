const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const Producto = sequelize.define('producto', {
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
  proveedor: {
    type: Sequelize.STRING,
    allowNull: true
  },
  marca: {
    type: Sequelize.STRING,
    allowNull: true
  },
  descripcion: {
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

module.exports = Producto