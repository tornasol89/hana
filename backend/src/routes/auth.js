import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import upload from '../config/cloudinary.js' 
import protegerRuta from '../middleware/auth.js' // Cambié 'auth' por 'protegerRuta'

const router = express.Router()
// PUT /api/auth/me — actualizar datos propios
router.put('/me', auth, async (req, res) => {
  try {
    const { nombre, apellido, region, comuna } = req.body
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { nombre, apellido, region, comuna },
      { new: true, select: '-password' }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar' })
  }
})
// --- RUTA PARA SUBIR FOTO ---
router.post('/upload-photo', protegerRuta, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ mensaje: 'No se seleccionó ninguna imagen' })
    }

    // OJO: En tu middleware usas 'req.usuario', así que aquí usamos lo mismo
    const usuario = await User.findByIdAndUpdate(
      req.usuario.id, 
      { foto: req.file.path },
      { new: true }
    ).select('-password')

    res.json({
      mensaje: 'Foto de perfil actualizada con éxito',
      foto: usuario.foto
    })
  } catch (error) {
    console.error('Error al subir a Cloudinary:', error)
    res.status(500).json({ mensaje: 'Error al procesar la imagen', error: error.message })
  }
})

// --- REGISTRO (Tu código original) ---
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, tipo, region, comuna, rut, aceptoCompromiso } = req.body
    const usuarioExiste = await User.findOne({ email })
    if (usuarioExiste) return res.status(400).json({ mensaje: 'El email ya está registrado' })

    if (!aceptoCompromiso) return res.status(400).json({ mensaje: 'Debes aceptar el Compromiso Hana' })

    const salt = await bcrypt.genSalt(10)
    const passwordEncriptada = await bcrypt.hash(password, salt)

    const usuario = await User.create({
      nombre, apellido, email,
      password: passwordEncriptada,
      tipo, region, comuna, rut,
      aceptoCompromiso: true,
      fechaAceptacion: new Date(),
      foto: "" 
    })

    const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(201).json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, tipo: usuario.tipo, foto: usuario.foto }
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
  }
})

// --- LOGIN (Tu código original) ---
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const usuario = await User.findOne({ email })
    if (!usuario) return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })

    const passwordCorrecta = await bcrypt.compare(password, usuario.password)
    if (!passwordCorrecta) return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })

    const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, apellido: usuario.apellido, email: usuario.email, tipo: usuario.tipo, foto: usuario.foto }
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
  }
})

export default router