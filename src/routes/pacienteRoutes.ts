import { Router } from 'express'
import PacienteController from '../controllers/pacienteController'
import { validationPacienteMiddleware } from '../middlewares/validationPacienteMiddleware';

const router = Router()
const pacienteController = new PacienteController()

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
  pacienteController.buscarPaciente.bind(pacienteController),
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
router.get(
  '/paciente/tutor/:tutorId',
  pacienteController.buscarPacientesTutor.bind(pacienteController),
)

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
router.get(
  '/paciente',
  pacienteController.listarPacientes.bind(pacienteController),
)

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
 *               dataNascimento:
 *                 type: string
 *                 example: "dd-mm-yyyy"
 *     responses:
 *       '200':
 *         description: Paciente criado com sucesso
 *       '400':
 *         description: O nome e a espécie do paciente são obrigatórios
 *       '500':
 *         description: Erro ao criar paciente
 */
router.post(
  '/paciente/:tutorId', validationPacienteMiddleware,
  pacienteController.criarPaciente.bind(pacienteController),
)

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
 *               dataNascimento:
 *                 type: string
 *                 example: "dd-mm-yyyy"
 *     responses:
 *       '200':
 *         description: Paciente atualizado com sucesso
 *       '400':
 *         description: O nome e a espécie do paciente são obrigatórios
 *       '404':
 *         description: Paciente ou tutor não encontrado
 *       '422':
 *         description: Formato de data inválido
 *       '500':
 *         description: Erro ao atualizar paciente
 */

router.put(
  '/paciente/:pacienteId/tutor/:tutorId', validationPacienteMiddleware,
  pacienteController.atualizarPaciente.bind(pacienteController),
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
  pacienteController.deletarPaciente.bind(pacienteController),
)

export default router
