import { Router } from 'express'
import TutorController from '../controllers/tutorController'
import PacienteController from '../controllers/pacienteController'
const router = Router()
router.get('/test', TutorController.teste)
router.get('/tutor', TutorController.listarTutores)
router.post('/tutor', TutorController.criarTutor)
router.put('/tutor/:id', TutorController.atualizarTutor)
router.delete('/tutor/:id', TutorController.deletarTutor)
router.post('/paciente/:tutorId', PacienteController.criarPaciente)
router.put(
  '/paciente/:pacienteId/tutor/:tutorId',
  PacienteController.atualizarPaciente,
)
router.delete(
  '/paciente/:pacienteId/tutor/:tutorId',
  PacienteController.deletarPaciente,
)

export default router
