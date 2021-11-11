const compraProductoServices = require("./compraProductoServices");
const egresoProductoServices = require("./egresoProductoServices");
const commonServices = require("./commonServices");
const Stock = require("../models/stock")
const crypto = require('crypto')

exports.getAllStocks = async () => {
    resultado = await Stock.findAll()
    return resultado
}

exports.getStockById = async (id) => {
    resultado = await Stock.findOne({ where: { id: id } })
    return resultado
}
exports.getStockByProductoId = async (id) => {
    resultado = await Stock.findOne({ where: { producto_id: id } })
    return resultado
}
exports.getDetallesIngresoEgreso = async (stock) => {
    let resultado = []
    const detallesCompra = await compraProductoServices.getAllCompraProductoByProductoId(stock.producto_id)
    const detallesEgreso = await egresoProductoServices.getAllEgresoProductoByProductoId(stock.producto_id)
    detallesCompra.forEach(e => {
        resultado.push({
            id:crypto.randomBytes(4).toString('hex'),
            operacion_id: e.compra_id,
            tipo_operacion: "Compra",
            producto: e.producto_nombre,
            cantidad: e.cantidad,
            precio: e.precio,
            total: e.cantidad * e.precio,
            fecha:commonServices.convertDbDateTimeToNormaldate(e.createdAt)
        })
    })
    detallesEgreso.forEach(e => {   
        resultado.push({
            id:crypto.randomBytes(4).toString('hex'),
            operacion_id: e.egreso_id,
            tipo_operacion: "Egreso",
            producto: e.producto_nombre,
            cantidad: e.cantidad,
            precio: null,
            total:null,
            fecha:commonServices.convertDbDateTimeToNormaldate(e.createdAt)
        })
    })
    resultado.map(e=>console.log(e))   
    return resultado
}

exports.add = async (body) => {

    resultado = await Stock.create({
        producto_id: body.insumo.id,
        producto_nombre: body.insumo.nombre,
        cantidad: body.cantidad,
        proveedor: body.proveedor,
    })
    return resultado
}

exports.updateStockFromCompra = async (stock, cantidad, t) => {

    await Stock.update({
        cantidad: stock.cantidad + parseInt(cantidad),
    }, { where: { producto_id: stock.producto_id }, transaction: t })

}
exports.updateStockFromEgreso = async (stock, cantidad, t) => {

    await Stock.update({
        cantidad: stock.cantidad - parseInt(cantidad),
    }, { where: { producto_id: stock.producto_id }, transaction: t })

}