const egresoServices = require("../services/egresoServices")
const sequelize = require('../database/sequelizeConnection')

exports.addEgreso = async (req, res, next) => {
  const t = await sequelize.transaction();
  console.log(req.body)
  try {
    resultado = await egresoServices.addEgreso(req.body, t)
    res.status(201).json({
      mensaje: "Egreso registrado satisfactoriamente.",
      orden: resultado,
    });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }
};