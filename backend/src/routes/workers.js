import express from 'express'
import User from '../models/User.js'
import WorkerProfile from '../models/WorkerProfile.js'
import protegerRuta from '../middleware/auth.js'

const router = express.Router()

// GET /api/workers — listar todas las trabajadoras (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const { categoria, region } = req.query

    // Buscar perfiles, con filtro de categoría si viene
    const filtro = {}
    if (categoria) filtro.categoria = categoria

    const perfiles = await WorkerProfile.find(filtro)
      .populate('usuario', 'nombre apellido foto region comuna verificada')

    // Filtrar por región si viene (está en el modelo User)
    const resultado = region
      ? perfiles.filter(p => p.usuario?.region === region)
      : perfiles

    res.json(resultado)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener trabajadoras', error: error.message })
  }
})

// GET /api/workers/:id — obtener perfil de una trabajadora por ID
router.get('/:id', async (req, res) => {
  try {
    const perfil = await WorkerProfile.findById(req.params.id)
      .populate('usuario', 'nombre apellido foto region comuna verificada')

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' })
    }

    res.json(perfil)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message })
  }
})

// POST /api/workers — crear perfil de trabajadora (requiere login)
router.post('/', protegerRuta, async (req, res) => {
  try {
    const { categoria, descripcion, tarifaHora } = req.body

    const perfilExiste = await WorkerProfile.findOne({ usuario: req.usuario.id })
    if (perfilExiste) {
      return res.status(400).json({ mensaje: 'Ya tienes un perfil de trabajadora' })
    }

    const perfil = await WorkerProfile.create({
      usuario: req.usuario.id,
      categoria,
      descripcion,
      tarifaHora
    })

    res.status(201).json(perfil)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear perfil', error: error.message })
  }
})

// PUT /api/workers/:id — actualizar perfil (requiere login)
router.put('/:id', protegerRuta, async (req, res) => {
  try {
    const perfil = await WorkerProfile.findById(req.params.id)

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' })
    }

    // Solo la dueña del perfil puede editarlo
    if (perfil.usuario.toString() !== req.usuario.id) {
      return res.status(403).json({ mensaje: 'No tienes permiso para editar este perfil' })
    }

    const actualizado = await WorkerProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar perfil', error: error.message })
  }
})

export default router