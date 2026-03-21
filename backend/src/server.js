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

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Hana funcionando ✅' })
}) // ← este } faltaba

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
  })
})