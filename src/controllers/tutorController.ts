import { Request, Response } from 'express'
import TutorModel from '../models/tutorModel'

class TutorController {
  static async listarTutores(req: Request, res: Response) {}

  static async criarTutor(req: Request, res: Response) {}

  static async atualizarTutor(req: Request, res: Response) {}

  static async deletarTutor(req: Request, res: Response) {}

  static async teste(req: Request, res: Response) {
    try {
      res.status(200).json({ message: 'Teste bem-sucedido!' })
    } catch (error) {
      console.error('Erro no teste:', error)
      res.status(500).json({ message: 'Erro no teste' })
    }
  }
}

export default TutorController
