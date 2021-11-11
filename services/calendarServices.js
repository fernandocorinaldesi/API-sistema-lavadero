const ordenTrabajoServices = require("./ordenesTrabajoServices")
const OrdenTrabajo = require("../models/ordenTrabajo")
const commonServices = require("./commonServices")
const moment = require('moment')

exports.getData = async () => {
    let ordenes = await OrdenTrabajo.findAll()
    ordenes = ordenes.filter(e => this.validWeekDate(e.fecha_entrega) && e.estado === 'pendiente')
    ordenes = await this.mergeData(ordenes)
    console.log(this.generateWeeks())
    const resultado = this.transform(ordenes,this.generateWeeks())
    return resultado
}

exports.transform = (ordenes, fechas) => {
    return resultado = fechas.map(e => {

        let ordenesMismaFecha = ordenes.filter(i => i.fecha === e)
        calculos = this.calculations(ordenesMismaFecha)

        return { fecha: e, calculos: calculos }
    })
}

exports.generateWeeks = () => {
    const week = []
    const now = commonServices.getNormalDate()
    for (let i = 1; i < 8; i++) {
        const day = moment(now).add(i, 'days').format('YYYY-MM-DD')
        week.push(day)
    }
    return week
}

exports.calculations = (ordenesMismaFecha) => {
    let valetSecado = 0
    let valetLavado = 0
    let prendas = 0
    ordenesMismaFecha.forEach(e => {
        
        completo = e.servicios.reduce((total, e) => {
            return (e.nombre === 'Valet completo') ? total + e.cantidad: total;
        }, 0); 
        console.log(completo)

        lavado = e.servicios.reduce((total, e) => {
            return (e.nombre === 'Valet solo lavado') ? total + e.cantidad: total;
        }, 0); 

        secado = e.servicios.reduce((total, e) => {
            return (e.nombre === 'Valet solo secado') ? total + e.cantidad: total;
        }, 0); 

        planchado = e.servicios.reduce((total, e) => {
            return (e.nombre.startsWith('Planchado')) ? total + e.cantidad: total;
        }, 0); 

        valetSecado = valetSecado + secado +(completo*2/2)
        valetLavado = valetLavado + lavado +(completo*2/2)
        prendas = prendas + planchado
    })
   return { secado: valetSecado, lavado: valetLavado, prendas: prendas }
}

exports.mergeData = async (ordenes) => {
    const resultado = await Promise.all(ordenes.map(async e => {
        ordenServicios = await ordenTrabajoServices.getOrdenDetalles(e)
        return {
            id: e.id, fecha: e.fecha_entrega, tipo_entrega: e.tipo_entrega
            , tipo_pago: e.tipo_pago, estado: e.estado, servicios: ordenServicios
        }

    }))
    return resultado
}

exports.validWeekDate = (fecha) => {
    const now = commonServices.getNormalDate()
    const week = moment(commonServices.getNormalDate()).add(7, 'days').format('YYYY-MM-DD')

    return ((moment(fecha,
        commonServices.NORMAL_DATE_FORMAT).isSameOrAfter(now, commonServices.NORMAL_DATE_FORMAT))
        && (moment(fecha,
            commonServices.NORMAL_DATE_FORMAT).isSameOrBefore(week, commonServices.NORMAL_DATE_FORMAT)))
}