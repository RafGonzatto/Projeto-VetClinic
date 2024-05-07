import { Request, Response } from 'express'
import defineTutorModel from '../models/tutorModel'

class TutorController {
  static async listarTutores(req: Request, res: Response) {
    try {
      let TutorModel = defineTutorModel(req.context.db)
      let tutores = await TutorModel.findAll()
      console.log(tutores.length)
      if (tutores.length == 0) {
        res.status(200).json({ message: 'Não há nenhum tutor cadastrado' })
      } else {
        res.status(200).json(tutores)
      }
    } catch (error) {
      console.error('Erro ao listar tutores:', error)
      res.status(500).json({ error: 'Erro ao listar tutores' })
    }
  }

  static async criarTutor(req: Request, res: Response) {
    try {
      let TutorModel = defineTutorModel(req.context.db)
      let maxIdTutor = (await TutorModel.max('id')) as number | null
      let proximoTutorId = maxIdTutor !== null ? maxIdTutor + 1 : 1
      let { nome, email, telefone } = req.body

      let novoTutor = await TutorModel.create({
        id: proximoTutorId,
        nome,
        email,
        telefone,
      })
      res.status(201).json(novoTutor)
    } catch (error) {
      console.error('Erro ao criar tutor:', error)
      res.status(500).json({ error: 'Erro ao criar tutor' })
    }
  }

  static async atualizarTutor(req: Request, res: Response) {
    try {
      const TutorModel = defineTutorModel(req.context.db)
      const { id } = req.params
      const { nome, email, telefone } = req.body
      const tutorExistente = await TutorModel.findByPk(id)
      if (!tutorExistente) {
        return res.status(404).json({ error: 'Tutor não encontrado' })
      }
      await TutorModel.update({ nome, email, telefone }, { where: { id } })
      const tutorAtualizado = await TutorModel.findByPk(id)
      res.status(200).json(tutorAtualizado)
    } catch (error) {
      console.error('Erro ao atualizar tutor:', error)
      res.status(500).json({ error: 'Erro ao atualizar tutor' })
    }
  }

  static async deletarTutor(req: Request, res: Response) {
    try {
      const TutorModel = defineTutorModel(req.context.db)
      const { id } = req.params

      const tutorExistente = await TutorModel.findByPk(id)
      if (!tutorExistente) {
        return res.status(404).json({ error: 'Tutor não encontrado' })
      }

      await TutorModel.destroy({ where: { id } })

      res.status(200).json({ message: 'Tutor excluído com sucesso' })
    } catch (error) {
      console.error('Erro ao excluir tutor:', error)
      res.status(500).json({ error: 'Erro ao excluir tutor' })
    }
  }
}

export default TutorController
