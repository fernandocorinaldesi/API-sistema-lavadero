const Cliente = require("../models/cliente");

exports.getAllClients = async () => {
    resultado = await Cliente.findAll()
    return resultado
  }
 
  exports.getClientByDni = async (dni)  =>{
    resultado = await Cliente.findOne({ where: { dni:dni  } })
    return resultado
  }

  exports.getClientByid = async (id)  =>{
    resultado = await Cliente.findOne({ where: { id:id  } })
    return resultado
  }

  exports.add = async (body)  =>{
    
    resultado = await Cliente.create({
      nombre: body.nombre,
      apellido: body.apellido,
      dni: body.dni,
      email: body.email,
      direccion: body.direccion,
      telefono: body.telefono
    })
    return resultado
  }

  exports.edit = async (body,id)  =>{
    
    resultado = await Cliente.update({
      nombre: body.nombre,
      apellido: body.apellido,
      dni: body.dni,
      email: body.email,
      direccion: body.direccion,
      localidad:body.localidad,
      provincia:body.provincia,
      telefono: body.telefono
    },{ where: { id: id }})
    return resultado
  }