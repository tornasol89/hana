import express from 'express'
import Review from '../models/Review.js'
import protegerRuta from '../middleware/auth.js'

const router = express.Router()

// POST /api/reviews — crear una evaluación (requiere login)
router.post('/', protegerRuta, async (req, res) => {
  try {
    const { destinataria, tipo, estrellas, metricas } = req.body

    // Evitar que alguien se evalúe a sí misma
    if (destinataria === req.usuario.id) {
      return res.status(400).json({ mensaje: 'No puedes evaluarte a ti misma' })
    }

    // Evitar evaluación duplicada
    const yaEvaluo = await Review.findOne({
      autor: req.usuario.id,
      destinataria
    })
    if (yaEvaluo) {
      return res.status(400).json({ mensaje: 'Ya evaluaste a esta usuaria' })
    }

    const review = await Review.create({
      autor: req.usuario.id,
      destinataria,
      tipo,
      estrellas,
      metricas
    })

    res.status(201).json(review)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear evaluación', error: error.message })
  }
})

// GET /api/reviews/:usuarioId — ver evaluaciones de una usuaria
router.get('/:usuarioId', async (req, res) => {
  try {
    const reviews = await Review.find({ destinataria: req.params.usuarioId })
      .populate('autor', 'nombre apellido foto')
      .sort({ createdAt: -1 })

    // Calcular promedio de estrellas
    const promedio = reviews.length
      ? (reviews.reduce((acc, r) => acc + r.estrellas, 0) / reviews.length).toFixed(1)
      : 0

    res.json({ promedio, total: reviews.length, reviews })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener evaluaciones', error: error.message })
  }
})

export default router