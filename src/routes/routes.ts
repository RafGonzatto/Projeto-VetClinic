import { Router } from 'express'
import TutorController from '../controllers/tutorController'
import PacienteController from '../controllers/pacienteController'
const router = Router()
/**
 * @swagger
 * /tutor/{id}:
 *   put:
 *     summary: Atualiza um tutor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser atualizado
 *       - in: body
 *         name: body
 *         required: true
 *         description: Novos detalhes do tutor
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             telefone:
 *               type: string
 *     responses:
 *       '200':
 *         description: Tutor atualizado com sucesso
 *       '404':
 *         description: Tutor não encontrado
 *       '500':
 *         description: Erro ao atualizar tutor
 */
router.get('/tutor', TutorController.listarTutores)
/**
 * @swagger
 * /tutor:
 *   post:
 *     summary: Cria um novo tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Tutor criado com sucesso
 *       '500':
 *         description: Erro ao criar tutor
 */
router.post('/tutor', TutorController.criarTutor)
/**
 * @swagger
 * /tutor/{id}:
 *   put:
 *     summary: Atualiza um tutor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser atualizado
 *       - in: body
 *         name: body
 *         required: true
 *         description: Novos detalhes do tutor
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             telefone:
 *               type: string
 *     responses:
 *       '200':
 *         description: Tutor atualizado com sucesso
 *       '404':
 *         description: Tutor não encontrado
 *       '500':
 *         description: Erro ao atualizar tutor
 */
router.put('/tutor/:id', TutorController.atualizarTutor)
/**
 * @swagger
 * /tutor/{id}:
 *   delete:
 *     summary: Exclui um tutor existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser excluído
 *     responses:
 *       '200':
 *         description: Tutor excluído com sucesso
 *       '404':
 *         description: Tutor não encontrado
 *       '500':
 *         description: Erro ao excluir tutor
 */
router.delete('/tutor/:id', TutorController.deletarTutor)
/**
 * @swagger
 * /paciente/{tutorId}:
 *   post:
 *     summary: Cria um novo paciente associado a um tutor
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor associado ao paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Paciente criado com sucesso
 *       '400':
 *         description: O nome e a espécie do paciente são obrigatórios
 *       '500':
 *         description: Erro ao criar paciente
 */
router.post('/paciente/:tutorId', PacienteController.criarPaciente)
/**
 * @swagger
 * /paciente/{pacienteId}/tutor/{tutorId}:
 *   put:
 *     summary: Atualiza um paciente associado a um tutor
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser atualizado
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor associado ao paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especie:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Paciente atualizado com sucesso
 *       '500':
 *         description: Erro ao atualizar paciente
 */
router.put(
  '/paciente/:pacienteId/tutor/:tutorId',
  PacienteController.atualizarPaciente,
)
/**
 * @swagger
 * /paciente/{pacienteId}/tutor/{tutorId}:
 *   delete:
 *     summary: Exclui um paciente associado a um tutor
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente a ser excluído
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor associado ao paciente
 *     responses:
 *       '204':
 *         description: Paciente excluído com sucesso
 *       '500':
 *         description: Erro ao deletar paciente
 */
router.delete(
  '/paciente/:pacienteId/tutor/:tutorId',
  PacienteController.deletarPaciente,
)

export default router
