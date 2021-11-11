const moment = require('moment')
moment.locale('es')

exports.NORMAL_DATE_FORMAT = 'YYYY-MM-DD'

exports.DB_DATE_TIME_FORMAT = 'LLLL'

exports.NORMAL_DATE_TIME_FORMAT = 'YYYY-MM-DD H:mm'

exports.VIEW_DATETIME_FORMAT = 'dddd, D MMMM YYYY, HH:mm a'

exports.VIEW_DATE_FORMAT = 'dddd, D MMMM YYYY'

/**
 * Función que devuelve la fecha de hoy.
 * @returns {String} - fecha en formato YYYY-MM-DD
 */
 exports.getNormalDate = () => {
    return moment().format(this.NORMAL_DATE_FORMAT)
}

/**
 * Función para convertir una fecha con hora en otro formato.
 * @param {String} fechahora - fecha en formato LLLL
 * @returns {String} - fecha en formato YYYY-MM-DD 
 */
 exports.convertDbDateTimeToNormaldate = (fechaHora) => {
    return moment(fechaHora, this.DB_DATE_TIME_FORMAT).format(this.NORMAL_DATE_FORMAT)
}
exports.convertDateToMonthYear = (fecha) => {
    return moment(fecha, this.NORMAL_DATE_FORMAT).format('MMMM YYYY')
}