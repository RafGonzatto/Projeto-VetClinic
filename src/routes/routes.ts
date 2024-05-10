import { Router } from 'express'
import TutorController from '../controllers/tutorController'
import PacienteController from '../controllers/pacienteController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tutores
 *   description: Endpoints relacionados aos tutores
 */

/**
 * @swagger
 * /tutor:
 *   get:
 *     summary: Lista todos os tutores cadastrados.
 *     tags: [Tutores]
 *     responses:
 *       '200':
 *         description: Retorna uma lista de todos os tutores.
 *       '500':
 *         description: Erro ao listar tutores.
 */
router.get('/tutor', TutorController.listarTutores)

/**
 * @swagger
 * /tutor:
 *   post:
 *     summary: Cria um novo tutor
 *     tags: [Tutores]
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
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser atualizado
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
 *     tags: [Tutores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor a ser excluído
 *     responses:
 *       '204':
 *         description: Tutor excluído com sucesso
 *       '500':
 *         description: Erro ao excluir tutor
 */
router.delete('/tutor/:id', TutorController.deletarTutor)

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints relacionados aos pacientes
 */

/**
 * @swagger
 * /paciente/{pacienteId}/tutor/{tutorId}:
 *   get:
 *     summary: Buscar paciente
 *     tags: [Pacientes]
 *     description: Retorna paciente específico associado ao tutor com os IDs fornecidos.
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do paciente
 *       - in: path
 *         name: tutorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do tutor associado ao paciente
 *     responses:
 *       '200':
 *         description: Sucesso. Retorna o paciente.
 *       '404':
 *         description: Paciente ou tutor não encontrado.
 *       '500':
 *         description: Erro ao buscar paciente do tutor.
 */
router.get(
  '/paciente/:pacienteId/tutor/:tutorId',
  PacienteController.buscarPaciente,
)

/**
 * @swagger
 * /paciente/tutor/{tutorId}:
 *   get:
 *     summary: Buscar pacientes por ID do tutor
 *     tags: [Pacientes]
 *     description: Retorna uma lista de pacientes associados ao tutor com o ID fornecido.
 *     parameters:
 *       - in: path
 *         name: tutorId
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
router.get('/paciente/tutor/:tutorId', PacienteController.buscarPacientesTutor)

/**
 * @swagger
 * /paciente:
 *   get:
 *     summary: Lista todos os pacientes cadastrados.
 *     tags: [Pacientes]
 *     responses:
 *       '200':
 *         description: Listagem feita com sucesso
 *       '500':
 *         description: Erro ao buscar pacientes
 */
router.get('/paciente', PacienteController.listarPacientes)

/**
 * @swagger
 * /paciente/{tutorId}:
 *   post:
 *     summary: Cria um novo paciente associado a um tutor
 *     tags: [Pacientes]
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
 *     tags: [Pacientes]
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
 *         description: Paciente ou tutor não encontrado
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
 *     tags: [Pacientes]
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
