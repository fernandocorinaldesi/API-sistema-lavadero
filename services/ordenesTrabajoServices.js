const OrdenTrabajo = require("../models/ordenTrabajo");
//const validationServices = require("./validationServices")

/*exports.getAll = async (paginaActual, porPagina) => {
  
  porPagina = porPagina || 100

  const resultado = {
    elementos: [],
    elementosEnTotal: 0,
  }

  resultado.elementos = await Publicacion.find()
    .countDocuments()
    .then((cantidad) => {
      resultado.elementosEnTotal = cantidad
      return Publicacion.find()
        .skip((paginaActual - 1) * porPagina)
        .limit(porPagina)
    })

  return resultado
}*/

exports.getAllOrders = async () => {


  resultado = await OrdenTrabajo.findAll()


  return resultado
}
exports.addOrder = async (body) => {


  const fechaEntrega = body.fechaEntrega
  const tipoEntrega = body.tipoEntrega
  const tipoPago = body.tipoPago
  const precio = body.precio
  const cliente = body.cliente
  const servicio = body.servicio

  resultado = await OrdenTrabajo.create({
    cliente_id:cliente,
    servicio_id:servicio,
    fecha_entrega: fechaEntrega,
    tipo_entrega: tipoEntrega,
    tipo_pago: tipoPago,
    precio: precio
  })

  return resultado
}


/*exports.findPubById = async (id) => {
  const elemento = await Publicacion.findById(id);
  return validationServices.existElement(elemento);
};

exports.addPub = async (req, usuario) => {
  const imagen = req.file.path
  const titulo = req.body.titulo
  const contenido = req.body.contenido
  const usuarioId = usuario

  const publicacion = new Publicacion({
    titulo: titulo,
    contenido: contenido,
    imagen: imagen,
    usuario: usuarioId,
  })

  return await publicacion.save()
}

exports.delPub = async (pub) => {
    this.deleteImage(pub.imagen)
    return await pub.remove();
};

exports.saveEdit = async (req, pub, image) => {
  (pub.titulo = req.body.titulo), (pub.imagen = image), (pub.contenido = req.body.contenido);
  return await pub.save();
};*/



