import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// REGISTRO
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, tipo, region, comuna, rut } = req.body

    const usuarioExiste = await User.findOne({ email })
    if (usuarioExiste) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordEncriptada = await bcrypt.hash(password, salt)

    const usuario = await User.create({
      nombre, apellido, email,
      password: passwordEncriptada,
      tipo, region, comuna, rut
    })

    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        tipo: usuario.tipo,
        verificada: usuario.verificada,
      }
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
  }
})

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })
    }

    const passwordCorrecta = await bcrypt.compare(password, usuario.password)
    if (!passwordCorrecta) {
      return res.status(400).json({ mensaje: 'Email o contraseña incorrectos' })
    }

    const token = jwt.sign(
      { id: usuario._id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        tipo: usuario.tipo,
        verificada: usuario.verificada,
      }
    })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
  }
})

export default router