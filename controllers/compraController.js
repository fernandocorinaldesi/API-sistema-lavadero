const compraServices = require("../services/compraServices")
const sequelize = require('../database/sequelizeConnection')


exports.addCompra = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    resultado = await compraServices.addCompra(req.body, t)
    res.status(201).json({
      mensaje: "Compra ingresada satisfactoriamente.",
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
