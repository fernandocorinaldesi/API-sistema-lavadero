const reunionServices = require("../services/reunionServices")
exports.getAll = async (req, res, next) => {
    try {
        const resultado = await reunionServices.getAll()

        res.status(200).json({
            mensaje: "Elementos encontrados",
            elementos: resultado,
        })
    } catch (error) {
        next(error)
    }
    
}

exports.postReunion = async (req, res, next) => {
    try {
      console.log("BODY : "+req.body)
      resultado = await reunionServices.addPub(req.body)
      res.status(201).json({
        mensaje: "Reunión creada.",
        publicacion: resultado,
      });
    } catch (error) {
      next(error)
    }

}