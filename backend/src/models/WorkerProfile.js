import mongoose from 'mongoose'

const workerProfileSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categoria: {
    type: String,
    enum: [
      'Estética y belleza', 'Hogar y limpieza', 'Clases y tutorías',
      'Cocina y catering', 'Bienestar y salud', 'Cuidado de mascotas',
      'Cuidado infantil', 'Tecnología y diseño', 'Gasfitería',
      'Electricidad', 'Mecánica', 'Carpintería', 'Plomería',
      'Pintura de interiores', 'Mudanzas y fletes', 'Jardinería',
      'Transporte y traslados'
    ],
    required: true
  },
  descripcion: { type: String, default: '' },
  tarifaHora: { type: Number, default: 0 },
  disponible: { type: Boolean, default: true },
  serviciosCompletados: { type: Number, default: 0 },
  tasaRespuesta: { type: Number, default: 100 },
  certificados: [{
    nombre: { type: String },
    institucion: { type: String },
    urlImagen: { type: String },
  }],
  metricas: {
    puntualidad: { type: Number, default: 0 },
    confiabilidad: { type: Number, default: 0 },
    calidad: { type: Number, default: 0 },
    comunicacion: { type: Number, default: 0 },
    precio: { type: Number, default: 0 },
  },
  indiceConfianza: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('WorkerProfile', workerProfileSchema)