import { Request, Response } from 'express'
import { TutorService } from '../services/tutorService'

class TutorController {
  private service: TutorService

  constructor() {
    this.service = new TutorService()
  }

  async listarTutores(req: Request, res: Response) {
    try {
      const tutores = await this.service.listarTutores()
      return res.status(200).json(tutores)
    } catch (error) {
      console.error('Erro ao listar tutores:', error)
      return res.status(500).json({ error: 'Erro ao listar tutores' })
    }
  }
  async listarTutoresPacientes(req: Request, res: Response) {
    try {
      const tutores = await this.service.listarTutoresPacientes()
      return res.status(200).json(tutores)
    } catch (error) {
      console.error('Erro ao listar tutores:', error)
      return res.status(500).json({ error: 'Erro ao listar tutores' })
    }
  }

  async criarTutor(req: Request, res: Response) {
    try {
      const { nome, email, telefone } = req.body
      console.log(nome, email, telefone)
      const novoTutor = await this.service.criarTutor(nome, email, telefone)
      return res.status(201).json(novoTutor)
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao criar tutor:', error)
        return res.status(500).json({ error: 'Erro ao criar tutor' })
      }
    }
  }

  async atualizarTutor(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { nome, email, telefone } = req.body
      const tutorAtualizado = await this.service.atualizarTutor(
        parseInt(id),
        nome,
        email,
        telefone,
      )
      return res.status(200).json(tutorAtualizado)
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao atualizar tutor:', error)
        return res.status(500).json({ error: 'Erro ao atualizar tutor' })
      }
    }
  }

  async deletarTutor(req: Request, res: Response) {
    try {
      const { id } = req.params
      await this.service.deletarTutor(parseInt(id))
      return res.status(200).json({
        message: 'Tutor e todos os seus pacientes excluídos com sucesso',
      })
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao deletar tutor:', error)
        return res.status(500).json({ error: 'Erro ao deletar tutor' })
      }
    }
  }
}

export default TutorController
