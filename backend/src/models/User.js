import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  apellido: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['clienta', 'trabajadora'], required: true },
  foto: { type: String, default: '' },
  carnet: { type: String, default: '' },
  rut: { type: String, default: '' },
  verificada: { type: Boolean, default: false },
  disponible: { type: Boolean, default: true },
  region: { type: String, default: '' },
  comuna: { type: String, default: '' },
}, { timestamps: true })

export default mongoose.model('User', userSchema)