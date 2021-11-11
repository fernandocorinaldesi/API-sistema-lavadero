const Sequelize = require('sequelize')
const Moment = require('moment')
Moment.locale('es')

const sequelize = require('../database/sequelizeConnection')


const Cliente = sequelize.define('cliente', {
  id: {  // es campo al ser serial y pk ,no es necesario especificarlo, dejar que sequelize lo maneje automaticamente
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dni: {
    type: Sequelize.STRING,
    allowNull: true
  },
  direccion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  localidad: {
    type: Sequelize.STRING,
    allowNull: true
  },
  provincia: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  telefono: {
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

module.exports = Cliente