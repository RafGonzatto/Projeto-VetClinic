import { Request, Response } from 'express'
import { PacienteService } from '../services/pacienteService'

class PacienteController {
  static async buscarPacientesTutor(req: Request, res: Response) {
    try {
      const tutorId = Number(req.params.tutorId)
      const pacientes = await PacienteService.buscarPacientesPorTutor(tutorId)
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes do tutor:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao buscar pacientes do tutor' })
    }
  }

  static async buscarPaciente(req: Request, res: Response) {
    try {
      const pacienteId = parseInt(req.params.pacienteId)
      const tutorId = parseInt(req.params.tutorId)
      const pacientes = await PacienteService.buscarPaciente(
        pacienteId,
        tutorId,
      )
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes do tutor:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao buscar pacientes do tutor' })
    }
  }
  static async listarPacientes(req: Request, res: Response) {
    try {
      const pacientes = await PacienteService.listarPacientes()
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
      return res.status(500).json({ error: 'Erro ao buscar pacientes' })
    }
  }
  static async criarPaciente(req: Request, res: Response) {
    try {
      const tutorId = parseInt(req.params.tutorId)
      const { nome, especie } = req.body
      const paciente = await PacienteService.criarPaciente(
        nome,
        especie,
        tutorId,
      )
      return res.status(200).json(paciente)
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao criar paciente:', error)
        return res.status(500).json({ error: 'Erro ao criar paciente' })
      }
    }
  }
  static async atualizarPaciente(req: Request, res: Response) {
    try {
      const pacienteId = parseInt(req.params.pacienteId)
      const tutorId = parseInt(req.params.tutorId)
      const { nome, especie } = req.body
      const pacienteAtualizado = await PacienteService.atualizarPaciente(
        pacienteId,
        tutorId,
        nome,
        especie,
      )
      return res.status(200).json(pacienteAtualizado)
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao atualizar paciente:', error)
        return res.status(500).json({ error: 'Erro ao atualizar paciente' })
      }
    }
  }

  static async deletarPaciente(req: Request, res: Response) {
    const pacienteId = parseInt(req.params.pacienteId)
    const tutorId = parseInt(req.params.tutorId)
    try {
      const result = await PacienteService.deletarPaciente(pacienteId, tutorId)
      if (result === 1) {
        return res.status(204).send()
      } else {
        throw new Error('Paciente não encontrado')
      }
    } catch (error) {
      console.error('Erro ao deletar paciente:', error)
      res.status(500).json({ error: 'Erro ao deletar paciente' })
    }
  }
}

export default PacienteController
