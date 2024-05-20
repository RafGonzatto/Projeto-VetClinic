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
    let idValidator = 1
    let validation = pacienteSchema.safeParse({
      id: idValidator,
      nome,
      especie,
      dataNascimento,
      tutorId,
    })
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(
        (error) => error.message,
      )
      const errorMessage = errorMessages.join(', ')
      throw createError(400, errorMessage)
    }
    let tutor = await this.tutorRepository.buscarTutorPorIdSemRelations(tutorId)
    if (!tutor) {
      throw createError(404, 'Tutor não encontrado')
    }
    let novoPaciente = this.repository.criarPaciente(
      nome,
      especie,
      dataNascimento,
      tutor,
    )
    return novoPaciente
  }
  async buscarPacientesTutor(tutorId: number): Promise<IPaciente[]> {
    let pacientes = await this.repository.buscarPacientesTutor(tutorId)
    return pacientes
  }

  async buscarPaciente(
    pacienteId: number,
    tutorId: number,
  ): Promise<IPaciente> {
    let paciente = await this.repository.buscarPaciente(pacienteId, tutorId)
    if (!paciente) {
      throw createError(404, 'Paciente não encontrado')
    }
    return paciente
  }
  async listarPacientes(): Promise<IPaciente[]> {
    let pacientes = await this.repository.listarPacientes()
    return pacientes
  }

  async atualizarPaciente(
    pacienteId: number,
    tutorId: number,
    nome: string,
    especie: string,
    dataNascimento: string,
  ): Promise<IPaciente> {
    let validation = pacienteSchema.safeParse({
      id: pacienteId,
      nome,
      especie,
      dataNascimento,
      tutorId,
    })
    if (!validation.success) {
      const errorMessages = validation.error.errors.map(
        (error) => error.message,
      )
      const errorMessage = errorMessages.join(', ')
      throw createError(400, errorMessage)
    }

    let pacienteExistente = await this.repository.buscarPaciente(
      pacienteId,
      tutorId,
    )
    if (!pacienteExistente) {
      throw createError(404, 'Paciente não encontrado')
    }
    let tutor = await this.tutorRepository.buscarTutorPorIdSemRelations(tutorId)
    if (!tutor) {
      throw createError(404, 'Tutor não encontrado')
    }
    pacienteExistente.nome = nome
    pacienteExistente.especie = especie
    pacienteExistente.dataNascimento = dataNascimento
    let pacienteAtualizado =
      this.repository.atualizarPaciente(pacienteExistente)

    return pacienteAtualizado
  }

  async deletarPaciente(pacienteId: number, tutorId: number): Promise<void> {
    await this.repository.deletarPaciente(pacienteId, tutorId)
  }
}
