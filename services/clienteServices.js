const Cliente = require("../models/cliente");

exports.getAllClients = async () => {


    resultado = await Cliente.findAll()
  
  
    return resultado
  }

  
  exports.getClientByDni = async (dni)  =>{
    resultado = await Cliente.findOne({ where: { dni:dni  } })
    return resultado
  }

  exports.add = async (body)  =>{
    
    return resultado
  }