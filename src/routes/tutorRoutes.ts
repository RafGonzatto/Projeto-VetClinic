import { Router } from 'express'
import TutorController from '../controllers/tutorController'

const router = Router()
const tutorController = new TutorController()
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
router.get('/tutor', tutorController.listarTutores.bind(tutorController))

/**
 * @swagger
 * /tutor/pacientes:
 *   get:
 *     summary: Lista todos os tutores cadastrados junto com seus pacientes.
 *     tags: [Tutores]
 *     responses:
 *       '200':
 *         description: Retorna uma lista de todos os tutores e pacientes.
 *       '500':
 *         description: Erro ao listar tutores.
 */
router.get(
  '/tutor/pacientes',
  tutorController.listarTutoresPacientes.bind(tutorController),
)
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
 *                 example: "User"
 *               email:
 *                 type: string
 *                 example: "user@email.com"
 *               telefone:
 *                 type: string
 *                 example: "0000000"
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
router.post('/tutor', (req, res) => tutorController.criarTutor(req, res))

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
 *                 example: "User"
 *               email:
 *                 type: string
 *                 example: "user@email.com"
 *               telefone:
 *                 type: string
 *                 example: "0000000"
 *     responses:
 *       '200':
 *         description: Tutor atualizado com sucesso
 *       '404':
 *         description: Tutor não encontrado
 *       '500':
 *         description: Erro ao atualizar tutor
 */
router.put('/tutor/:id', tutorController.atualizarTutor.bind(tutorController))

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
router.delete('/tutor/:id', tutorController.deletarTutor.bind(tutorController))

export default router
