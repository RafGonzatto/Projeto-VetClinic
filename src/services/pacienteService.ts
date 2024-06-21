import { Paciente } from '../models/pacienteModel'
import { IPaciente } from '../interfaces/pacienteInterface'
import { PacienteRepository } from '../repositories/pacienteRepository'
import { TutorRepository } from '../repositories/tutorRepository'
import { pacienteSchema } from '../validators/pacienteValidator'
import createError from 'http-errors'

export class PacienteService {
  private repository: PacienteRepository
  private tutorRepository: TutorRepository

  constructor() {
    this.repository = new PacienteRepository()
    this.tutorRepository = new TutorRepository()
  }

  async criarPaciente(
    nome: string,
    especie: string,
    dataNascimento: string,
    tutorId: number,
  ): Promise<Paciente> {
    const tutor =
      await this.tutorRepository.buscarTutorPorIdSemRelations(tutorId)
    if (!tutor) {
      throw createError(404, 'Tutor não encontrado')
    }
    const novoPaciente = this.repository.criarPaciente(
      nome,
      especie,
      dataNascimento,
      tutor,
    )
    return novoPaciente
  }
  async buscarPacientesTutor(tutorId: number): Promise<IPaciente[]> {
    const pacientes = await this.repository.buscarPacientesTutor(tutorId)
    return pacientes
  }

  async buscarPaciente(
    pacienteId: number,
    tutorId: number,
  ): Promise<IPaciente> {
    const paciente = await this.repository.buscarPaciente(pacienteId, tutorId)
    if (!paciente) {
      throw createError(404, 'Paciente não encontrado')
    }
    return paciente
  }
  async listarPacientes(): Promise<IPaciente[]> {
    const pacientes = await this.repository.listarPacientes()
    return pacientes
  }

  async atualizarPaciente(
    pacienteId: number,
    tutorId: number,
    nome: string,
    especie: string,
    dataNascimento: string,
  ): Promise<IPaciente> {
    const pacienteExistente = await this.repository.buscarPaciente(
      pacienteId,
      tutorId,
    )
    if (!pacienteExistente) {
      throw createError(404, 'Paciente não encontrado')
    }
    const tutor =
      await this.tutorRepository.buscarTutorPorIdSemRelations(tutorId)
    if (!tutor) {
      throw createError(404, 'Tutor não encontrado')
    }
    pacienteExistente.nome = nome
    pacienteExistente.especie = especie
    pacienteExistente.dataNascimento = dataNascimento
    const pacienteAtualizado =
      this.repository.atualizarPaciente(pacienteExistente)

    return pacienteAtualizado
  }

  async deletarPaciente(pacienteId: number, tutorId: number): Promise<void> {
    await this.repository.deletarPaciente(pacienteId, tutorId)
  }
}
