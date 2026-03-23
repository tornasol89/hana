import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import workerRoutes from './routes/workers.js'
import bookingRoutes from './routes/bookings.js'
import reviewRoutes from './routes/reviews.js'

dotenv.config()

const app = express()

const uploadRoutes = require('./routes/upload')
app.use('/api/upload', uploadRoutes)

// Configuramos CORS para que acepte peticiones de tu frontend
app.use(cors())

// Aumentamos el límite de tamaño para poder recibir imágenes sin errores
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Hana funcionando ✅' })
})

// Usamos el puerto del .env (que vimos que es el 5001 en tu caso)
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
  })
})