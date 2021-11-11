const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const Compra = sequelize.define('compra', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fecha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  precio_total: {
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

module.exports = Compra