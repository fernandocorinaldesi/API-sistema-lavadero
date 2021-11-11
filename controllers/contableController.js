const contableServices = require("../services/contableService");

exports.getAllByDay= async (req, res, next) => {
    let resultado
    try {
        compras = await contableServices.getAllComprasByDay()
        ordenes = await contableServices.getAllOrdenesByDay()
        resultado = compras.concat(ordenes)
        resultado.sort(function(a,b){return new Date(b.fecha) - new Date(a.fecha);});
 
        res.status(200).json({
            mensaje: "Elementos encontrados",
            elementos: resultado,
           
        })
    } catch (error) {
        console.log(error)
        const mensaje = new Error('Error.')
        return next(mensaje)
    }

}

exports.getOrdenesByDay = async (req, res, next) => {
    let resultado
    try {
        resultado = await contableServices.getAllOrdenesByDay()
        
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

exports.getComprasByDay = async (req, res, next) => {
    let resultado
    try {
        resultado = await contableServices.getAllComprasByDay()
        
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

exports.getOrdenesDetallesByDay = async (req, res, next) => {
    const fecha = req.params.detalle
    let resultado
    try {
        resultado = await contableServices.getAllOrdenesDetalleByDay(fecha)
        
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

exports.getComprasDetallesByDay = async (req, res, next) => {
    const fecha = req.params.detalle
    let resultado
    try {
        resultado = await contableServices.getAllComprasDetalleByDay(fecha)
        
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

exports.getBalance = async (req, res, next) => {
 
  
    try {
        compras = await contableServices.getComprasMes()
        ordenes = await contableServices.getOrdenesMes()

        resultado = contableServices.getCalculateBalance(compras,ordenes)
        
        res.status(200).json({
            mensaje: "Elementos encontrados",
            //compras: compras,
            //ordenes: ordenes,
            resultado: resultado,
        })
    } catch (error) {
        console.log(error)
        const mensaje = new Error('Error.')
        return next(mensaje)
    }
   
}

