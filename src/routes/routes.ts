import express from 'express'
import tutorRoutes from './tutorRoutes'
import pacienteRoutes from './pacienteRoutes'

const router = express.Router()

router.use('', tutorRoutes)
router.use('', pacienteRoutes)

export default router
