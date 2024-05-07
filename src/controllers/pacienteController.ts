import { Request, Response } from 'express'
import { PacienteInstance } from '../models/pacienteModel'
import definePacienteModel from '../models/pacienteModel'

class PacienteController {
  static async criarPaciente(req: Request, res: Response) {
    try {
      const PacienteModel = definePacienteModel(req.context.db)
      const maxIdPaciente = (await PacienteModel.max('id')) as number | null
      const proximoId = maxIdPaciente !== null ? maxIdPaciente + 1 : 1
      const tutorId = parseInt(req.params.tutorId)
      if (!req.body.nome || !req.body.especie) {
        return res
          .status(400)
          .json({ message: 'O nome e a espécie do paciente são obrigatórios' })
      }

      const novoPaciente = await PacienteModel.create({
        id: proximoId,
        nome: req.body.nome,
        especie: req.body.especie,
        tutorId: tutorId,
      })
      res.status(200).json(novoPaciente)
    } catch (error) {
      console.error('Erro ao criar paciente:', error)
      res.status(500).json({ message: 'Erro ao criar paciente' })
    }
  }

  static async atualizarPaciente(req: Request, res: Response) {
    const pacienteId = req.params.id
    try {
      const PacienteModel = definePacienteModel(req.context.db)
      const [updated] = await PacienteModel.update(req.body, {
        where: { id: pacienteId },
      })

      if (updated) {
        const updatedPaciente = await PacienteModel.findOne({
          where: { id: pacienteId },
        })
        return res.status(200).json(updatedPaciente)
      }
      throw new Error('Paciente não encontrado')
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      res.status(500).json({ error: 'Erro ao atualizar paciente' })
    }
  }

  static async deletarPaciente(req: Request, res: Response) {
    const pacienteId = req.params.id
    try {
      const PacienteModel = definePacienteModel(req.context.db)
      const deleted = await PacienteModel.destroy({
        where: { id: pacienteId },
      })

      if (deleted) {
        return res.status(204).send()
      }
      throw new Error('Paciente não encontrado')
    } catch (error) {
      console.error('Erro ao deletar paciente:', error)
      res.status(500).json({ error: 'Erro ao deletar paciente' })
    }
  }
}

export default PacienteController
