import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  clienta: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trabajadora: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  servicio: { type: String, required: true },
  fecha: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  direccion: { type: String, required: true },
  descripcion: { type: String, default: '' },
  estado: {
    type: String,
    enum: ['pendiente', 'aceptada', 'rechazada', 'completada', 'cancelada'],
    default: 'pendiente'
  },
  precio: { type: Number, default: 0 },
  notaClientа: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('Booking', bookingSchema)