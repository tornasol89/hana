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

// Configuración de CORS
app.use(cors())

// Middleware para recibir JSON y formularios con límite ampliado
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Hana funcionando ✅' })
})

// Puerto
const PORT = process.env.PORT || 5000

// Conexión a BD + arranque del servidor
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error al conectar la base de datos:', error)
    process.exit(1)
  })