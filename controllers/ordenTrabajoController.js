const ordenTrabajoServices = require("../services/ordenesTrabajoServices")
const validationServices = require("../services/validationServices")

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
    next(error)
  }

}
exports.addOrder = async (req, res, next) => {
  
  try {
    resultado = await ordenTrabajoServices.addOrder(req.body)
    res.status(201).json({
      mensaje: "Orden de trabajo creada.",
      publicacion: resultado,
    });
  } catch (error) {
    next(error)
  }
};

/*exports.findById = async (req, res, next) => {
  const id = req.params.id
  try {
   const resultado = await publicacionesServices.findPubById(id);
   res.status(200).json({
      mensaje: 'Elemento encontrado',
      elemento: resultado
  })
  } catch (error) {
    next(error);
  }
};

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

