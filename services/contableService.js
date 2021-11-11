const Compra = require("../models/compra");
const commonServices = require("./commonServices");
const OrdenTrabajoService = require("../services/ordenesTrabajoServices")
const CompraProductoService = require("../services/compraProductoServices")
const OrdenTrabajo = require("../models/ordenTrabajo")
const Producto = require("../models/producto")


exports.getAllOrdenesByDay = async () => {
    const resultado = await OrdenTrabajo.findAll()
    const byday = groupBy(resultado, (c) => commonServices.convertDbDateTimeToNormaldate(c.createdAt));
    return calculateTotalByDay(byday, "Ordenes de trabajo");
}

exports.getAllComprasByDay = async () => {
    const resultado = await Compra.findAll()
    const byday = groupBy(resultado, (c) => commonServices.convertDbDateTimeToNormaldate(c.createdAt));
    return calculateTotalByDay(byday, "Compras");
}

exports.getAllOrdenesDetalleByDay = async (fecha) => {
    const resultado = await OrdenTrabajoService.getAllOrders()
    return resultado.filter(e => commonServices.convertDbDateTimeToNormaldate(e.fecha_ingreso) === fecha)
}

exports.getAllComprasDetalleByDay = async (fecha) => {
    const compras = await CompraProductoService.getAllCompraProducto()
    compras.map(e => console.log(commonServices.convertDbDateTimeToNormaldate(e.createdAt)))
    const resultado = compras.filter(e => commonServices.convertDbDateTimeToNormaldate(e.createdAt) === fecha)
    const resultadoFinal = await Promise.all(resultado.map(async e => {
        prod = await Producto.findOne({ where: { id: e.producto_id } })
        return  {id:e.id,compra_id:e.compra_id,producto_id:e.producto_id,
            cantidad:e.cantidad,precio:e.precio,marca:prod.marca,proveedor:prod.proveedor
        ,producto_nombre:prod.nombre}
    }))

    resultadoFinal.map(e => console.log(e))
    return resultadoFinal
}

exports.getAllOrdenes = async () => {
    const resultado = await OrdenTrabajo.findAll()
    const byday = groupBy(resultado, (c) => commonServices.convertDbDateTimeToNormaldate(c.createdAt));
    return byday;
}

calculateTotalByDay = (byday, tipo) => {
    const array = []
    for (const property in byday) {
        console.log(`${property}: ${byday[property]}`);
        let total = 0
        byday[property].forEach(e => {
            if (tipo === "Ordenes de trabajo")
                total += e.precio
            if (tipo === "Compras")
                total += e.precio_total
        })
        obj = {
            tipo: tipo,
            fecha: property,
            total: total
        }
        array.push(obj)
    }
    return array
}

groupBy = (xs, f) => {
    return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}

exports.getOrdenesMes = async () => {
    const resultado = await OrdenTrabajo.findAll()
    const bymonth = groupBy(resultado, (c) => commonServices.convertDateToMonthYear(commonServices.convertDbDateTimeToNormaldate(c.createdAt)));
    return calculateTotalByDay(bymonth, "Ordenes de trabajo");

}

exports.getComprasMes = async () => {
    const resultado = await Compra.findAll()
    const bymonth = groupBy(resultado, (c) => commonServices.convertDateToMonthYear(commonServices.convertDbDateTimeToNormaldate(c.createdAt)));
    return calculateTotalByDay(bymonth, "Compras");
}

exports.getCalculateBalance = (compras, ordenes) => {
    const comprasTam = compras.length
    const ordenesTam = ordenes.length
    let resultado = []
    if (comprasTam === ordenesTam) {
        ordenes.forEach(o => {
            compras.forEach(c => {
                if (o.fecha === c.fecha) {
                    balance = o.total - c.total
                    res = {
                        descripcion: "Resumen "+o.fecha,
                        total: balance
                    }
                    resultado.push(res)
                }
            })
        })
    }

    if (comprasTam < ordenesTam) {
        ordenes.forEach(o => {
            compras.forEach(c => {
                if (o.fecha === c.fecha) {
                    balance = o.total - c.total
                    res = {
                        descripcion: "Resumen "+c.fecha,
                        total: balance
                    }
                }
                else {
                    res = {
                        descripcion: "Resumen "+o.fecha,
                        total: o.total
                    }
                }
                resultado.push(res)

            })
        })
    }

    if (comprasTam > ordenesTam) {
        compras.forEach(o => {
            ordenes.forEach(c => {
                if (c.fecha === o.fecha) {
                    balance = o.total - c.total
                    res = {
                        descripcion: "Resumen "+c.fecha,
                        total: balance
                    }
                }
                else {
                    res = {
                        descripcion: "Resumen "+c.fecha,
                        total: -c.total
                    }
                }
                resultado.push(res)

            })
        })
    }
    return resultado
}