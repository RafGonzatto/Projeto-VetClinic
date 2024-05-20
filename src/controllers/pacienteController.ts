import { Request, Response } from 'express'
import { PacienteService } from '../services/pacienteService'

class PacienteController {
  private service: PacienteService

  constructor() {
    this.service = new PacienteService()
  }

  async criarPaciente(req: Request, res: Response) {
    try {
      const tutorId = parseInt(req.params.tutorId)
      const { nome, especie, dataNascimento } = req.body
      const paciente = await this.service.criarPaciente(
        nome,
        especie,
        dataNascimento,
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
  async buscarPacientesTutor(req: Request, res: Response) {
    try {
      const tutorId = Number(req.params.tutorId)
      const pacientes = await this.service.buscarPacientesTutor(tutorId)
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes do tutor:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao buscar pacientes do tutor' })
    }
  }

  async buscarPaciente(req: Request, res: Response) {
    try {
      const pacienteId = parseInt(req.params.pacienteId)
      const tutorId = parseInt(req.params.tutorId)
      const pacientes = await this.service.buscarPaciente(pacienteId, tutorId)
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes do tutor:', error)
      return res
        .status(500)
        .json({ error: 'Erro ao buscar pacientes do tutor' })
    }
  }
  async listarPacientes(req: Request, res: Response) {
    try {
      const pacientes = await this.service.listarPacientes()
      return res.json(pacientes)
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error)
      return res.status(500).json({ error: 'Erro ao buscar pacientes' })
    }
  }
  async atualizarPaciente(req: Request, res: Response) {
    try {
      const pacienteId = parseInt(req.params.pacienteId)
      const tutorId = parseInt(req.params.tutorId)
      const { nome, especie, dataNascimento } = req.body
      const pacienteAtualizado = await this.service.atualizarPaciente(
        pacienteId,
        tutorId,
        nome,
        especie,
        dataNascimento,
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

  async deletarPaciente(req: Request, res: Response) {
    try {
      const pacienteId = parseInt(req.params.pacienteId)
      const tutorId = parseInt(req.params.tutorId)
      await this.service.deletarPaciente(pacienteId, tutorId)
      return res.status(200).json({
        message: 'Paciente removido com sucesso',
      })
    } catch (error: any) {
      if (error && error.status) {
        return res.status(error.status).json({ message: error.message })
      } else {
        console.error('Erro ao criar tutor:', error)
        return res.status(500).json({ error: 'Erro ao criar tutor' })
      }
    }
  }
}

export default PacienteController
