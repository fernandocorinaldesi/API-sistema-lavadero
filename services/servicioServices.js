const Servicio = require("../models/servicio");

exports.getAllServices = async () => {
  
    resultado = await Servicio.findAll()

    return resultado
  }