const ordenTrabajoServices = require("../services/ordenesTrabajoServices")
const validationServices = require("../services/validationServices")
const sequelize = require('../database/sequelizeConnection')

exports.getAll = async (req, res, next) => {
  //const paginaActual = req.query.page || 1
  try {
    const resultado = await ordenTrabajoServices.getAllOrders()

    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      total: resultado.length
    })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }

}
exports.addOrden = async (req, res, next) => {
  const t = await sequelize.transaction();
  console.log(req.body)
  try {
    resultado = await ordenTrabajoServices.addOrder(req.body, t)
    res.status(201).json({
      mensaje: "Orden de trabajo creada.",
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
exports.updateOrden = async (req, res, next) => {
  const id = req.params.id
  console.log("ORDEN DE TRABAJO "+req.body)
  try {
     const orden = await ordenTrabajoServices.findOrdenById(id);
     const resultado = await ordenTrabajoServices.updateOrden(orden,req.body)

     res.status(200).json({
      mensaje: "Orden de trabajo actualizada.",
      orden: resultado,
    });

  } catch (error) {
     console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }
};

exports.findById = async (req, res, next) => {
  const id = req.params.id
  try {
   const resultado = await ordenTrabajoServices.findOrdenById(id);
   res.status(200).json({
      mensaje: 'Elemento encontrado',
      elemento: resultado
  })
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const id = req.params.id
  console.log("ES EL ID"+id)

  try {
    const resultado = await ordenTrabajoServices.findOrdenById(id);
    console.log("RESULTADO "+resultado)
    
    const resultadoDeleted = await ordenTrabajoServices.delete(resultado)
      res.status(200).json({
          mensaje: 'Orden de trabajo eliminada.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}
/*
exports.addPublicacion = async (req, res, next) => {
  let usuario
  try {
    validationServices.validImageFile(req)
    usuario = await validationServices.findUser(req.body.usuario)
    resultado = await publicacionesServices.addPub(req,usuario.username)
    res.status(201).json({
      mensaje: "Publicación creada.",
      publicacion: resultado,
    });
  } catch (error) {
    next(error)
  }
};

exports.editar = async (req, res, next) => {
  const id = req.params.id
  try {
    // Extracción de la imagen
    // Si se modifico la imagen, el formulario viene con un req.file
    let imagen
    if (req.file) {
      imagen = req.file.path
    }
    // Si no se modifico la imagen, el formulario de editar ya tiene la URL
    if(req.body.imagen){
      imagen = req.body.imagen
    }
    //validacion imagen
    validationServices.validImage(imagen)

    const resultado = await publicacionesServices.findPubById(id)
    validationServices.isUsuarioEqualsUser(resultado.usuario,req.userName)
    validationServices.isImageEqualsPubImage(imagen,resultado.imagen)
    const resultadoEdit= await publicacionesServices.saveEdit(req,resultado,imagen)
    res.status(200).json({
      mensaje: 'Publicación actualizada.',
      publicacion: resultadoEdit
  })
  } catch (error) {
   next(error)
  }
}
exports.eliminar = async (req, res, next) => {
  const id = req.params.id

  try {
    const pub = await publicacionesServices.findPubById(id)
    validationServices.isUsuarioEqualsUser(pub.usuario,req.userName)
    const resultadoDeleted = await publicacionesServices.delPub(pub)
      res.status(200).json({
          mensaje: 'Publicación eliminada.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}*/

