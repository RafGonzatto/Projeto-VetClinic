import { Router } from 'express'
import TutorController from '../controllers/tutorController'
import PacienteController from '../controllers/pacienteController'
const router = Router()
/**
 * @swagger
 * /tutor:
 *   get:
 *     summary: Lista todos os tutores cadastrados.
 *     responses:
 *       '200':
 *         description: "Uma das seguintes operações bem sucedida ocorreu: Retorna uma lista de todos os tutores, Não há nenhum tutor cadastrado"
 *       '500':
 *         description: Erro ao listar tutores.
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
 *       '400':
 *         description: Nome, email e telefone são obrigatórios
 *       '409':
 *         description: Email já foi cadastrado
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
 *     requestBody:
 *       required: true
 *       description: Novos detalhes do tutor
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
 * /tutor/{id}:
 *   get:
 *     summary: Buscar pacientes por ID do tutor
 *     description: Retorna uma lista de pacientes associados ao tutor com o ID fornecido.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do tutor
 *     responses:
 *       '200':
 *         description: Sucesso. Retorna a lista de pacientes.
 *       '404':
 *         description: Tutor não encontrado.
 *       '500':
 *         description: Erro ao buscar pacientes do tutor.
 */
router.get('/tutor/:id', PacienteController.buscarPacientesTutor)
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
 *       '400':
 *         description: O nome e a espécie do paciente são obrigatórios
 *       '404':
 *         description: Tutor não encontrado
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
