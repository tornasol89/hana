import express from 'express'
import Booking from '../models/Booking.js'
import protegerRuta from '../middleware/auth.js'

const router = express.Router()

// POST /api/bookings — crear una reserva (requiere login)
router.post('/', protegerRuta, async (req, res) => {
  try {
    const { trabajadora, servicio, fecha } = req.body

    const reserva = await Booking.create({
      clienta: req.usuario.id,
      trabajadora,
      servicio,
      fecha,
      estado: 'pendiente'
    })

    res.status(201).json(reserva)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear reserva', error: error.message })
  }
})

// GET /api/bookings/mis-reservas — ver reservas de la usuaria logueada
router.get('/mis-reservas', protegerRuta, async (req, res) => {
  try {
    const reservas = await Booking.find({
      $or: [
        { clienta: req.usuario.id },
        { trabajadora: req.usuario.id }
      ]
    })
      .populate('clienta', 'nombre apellido foto')
      .populate('trabajadora', 'nombre apellido foto')
      .sort({ createdAt: -1 })

    res.json(reservas)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message })
  }
})

// PUT /api/bookings/:id/aceptar — trabajadora acepta la reserva
router.put('/:id/aceptar', protegerRuta, async (req, res) => {
  try {
    const reserva = await Booking.findById(req.params.id)

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' })
    }

    if (reserva.trabajadora.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'Solo la trabajadora puede aceptar esta reserva' })
    }

    reserva.estado = 'aceptada'
    await reserva.save()

    res.json(reserva)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al aceptar reserva', error: error.message })
  }
})

// PUT /api/bookings/:id/rechazar — trabajadora rechaza la reserva
router.put('/:id/rechazar', protegerRuta, async (req, res) => {
  try {
    const reserva = await Booking.findById(req.params.id)

    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' })
    }

    if (reserva.trabajadora.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'Solo la trabajadora puede rechazar esta reserva' })
    }

    reserva.estado = 'rechazada'
    await reserva.save()

    res.json(reserva)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al rechazar reserva', error: error.message })
  }
})

export default router