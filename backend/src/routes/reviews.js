import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta reviews funcionando' })
})

export default router