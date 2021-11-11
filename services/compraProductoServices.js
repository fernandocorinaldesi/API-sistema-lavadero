const CompraProducto = require("../models/compraProducto");
const Stock = require("../models/stock")
const stockServices = require("./stockServices")

exports.add = async (productos,compraId,t) => {
   let stock
   const res =  await Promise.all(productos.map(async (e, i) => {
     
        await CompraProducto .create({
            compra_id: compraId,
            producto_id:e.id,
            producto_nombre:e.nombre,
            cantidad: e.cantidad,
            precio:e.precio,
            }, { transaction: t });
          

            stock = await stockServices.getStockByProductoId(e.id)
            if(!stock){
            await Stock .create({
                producto_id:e.id,
                producto_nombre:e.nombre,
                producto_marca:e.marca,
                cantidad: e.cantidad,
                proveedor:e.proveedor,
                }, { transaction: t });
            }
            else{
                await stockServices.updateStockFromCompra(stock,e.cantidad,t)
            }

    }))
    return res
  }

  exports.getAllCompraProducto = async (compra) => {

    resultado = await CompraProducto.findAll({ where: { compra_id:compra.id  } })
  
    return resultado
  }

  exports.getAllCompraProducto = async () => {

    resultado = await CompraProducto.findAll()
  
    return resultado
  }

  exports.getAllCompraProductoByProductoId = async (id) => {

    resultado = await CompraProducto.findAll({ where: { producto_id:id  } })
  
    return resultado
  }