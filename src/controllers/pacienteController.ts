import { Request, Response } from 'express'
import definePacienteModel from '../models/pacienteModel'
import PacienteRepository from '../repository/pacienteRepository'

class PacienteController {
  static async criarPaciente(req: Request, res: Response) {
    try {
      let PacienteModel = definePacienteModel(req.context.db)
      let maxIdPaciente = (await PacienteModel.max('id')) as number | null
      let proximoId = maxIdPaciente !== null ? maxIdPaciente + 1 : 1
      let tutorId = parseInt(req.params.tutorId)
      if (!req.body.nome || !req.body.especie) {
        return res
          .status(400)
          .json({ message: 'O nome e a espécie do paciente são obrigatórios' })
      }

      let novoPaciente = await PacienteModel.create({
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
    let pacienteId = req.params.pacienteId
    let tutorId = req.params.tutorId
    try {
      let PacienteModel = definePacienteModel(req.context.db)
      let updatedPaciente = await PacienteModel.findOne({
        where: { id: pacienteId, tutorId: tutorId },
      })

      if (!updatedPaciente) {
        throw new Error('Paciente não encontrado')
      }

      await updatedPaciente.update(req.body)
      return res.status(200).json(updatedPaciente)
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error)
      res.status(500).json({ error: 'Erro ao atualizar paciente' })
    }
  }

  static async deletarPaciente(req: Request, res: Response) {
    let pacienteId = req.params.pacienteId
    let tutorId = req.params.tutorId
    try {
      let PacienteModel = definePacienteModel(req.context.db)
      let deleted = await PacienteModel.destroy({
        where: { id: pacienteId, tutorId: tutorId },
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
