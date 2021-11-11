const EgresoProducto = require("../models/egresoProducto");
const stockServices = require("./stockServices")

exports.add = async (productos, egresoId, t) => {
    let stock
    const res = await Promise.all(productos.map(async (e, i) => {

        await EgresoProducto.create({
            egreso_id: egresoId,
            producto_id: e.id,
            producto_nombre: e.nombre,
            cantidad: e.cantidad,
        }, { transaction: t });


        stock = await stockServices.getStockByProductoId(e.id)
        await stockServices.updateStockFromEgreso(stock, e.cantidad, t)
    }))
    return res
}

exports.getAllEgresoProducto = async () => {
    resultado = await EgresoProducto.findAll()
    return resultado
}

exports.getAllEgresoProductoByProductoId = async (id) => {
    resultado = await EgresoProducto.findAll({ where: { producto_id: id } })
    return resultado
}