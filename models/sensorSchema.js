const mongoose = require('mongoose')
const Schema = mongoose.Schema

let sensorSchema = Schema({
    _id: { type: Schema.ObjectId, auto: true }, // Clave única generada automáticamente
    co2: Number,
    temperatura: Number,
    humedad: Number,
    fecha: { type: Schema.Types.Date, default: Date.now }, // Fecha de obtención del dato
    idSensor: Number // Identificamos el sensor que emite el dato
}, {
    timestamps: true, // Creará dos campos para guardar la fecha de creación (createdAt) y la última modificación (updatedAt) del dato
    versionKey: false
})

module.exports = mongoose.model('Dato', sensorSchema)