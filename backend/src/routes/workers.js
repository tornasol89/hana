import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta workers funcionando' })
})

export default router