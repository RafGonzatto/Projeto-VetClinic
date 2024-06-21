import { ITutor } from '../interfaces/tutorInterface'
import { TutorRepository } from '../repositories/tutorRepository'
import { PacienteRepository } from '../repositories/pacienteRepository'
import { tutorSchema } from '../validators/tutorValidator'
import createError from 'http-errors'

export class TutorService {
  private repository: TutorRepository
  private pacienteRepository: PacienteRepository

  constructor() {
    this.repository = new TutorRepository()
    this.pacienteRepository = new PacienteRepository()
  }

  async listarTutores() {
    const tutores = await this.repository.listarTutores()
    return tutores
  }
  async listarTutoresPacientes() {
    const tutores = await this.repository.listarTutoresPacientes()
    const tutoresComPacientes = tutores.map((tutor) => {
      let pacientes: {
        id: number | undefined
        nome: string | undefined
        especie: string | undefined
        dataNascimento: string | undefined
      }[] = []
      if (tutor.pacientes) {
        pacientes = tutor.pacientes.map((paciente) => {
          return {
            id: paciente.id,
            nome: paciente.nome,
            especie: paciente.especie,
            dataNascimento: paciente.dataNascimento,
          }
        })
      }
      return {
        tutor: {
          id: tutor.id,
          nome: tutor.nome,
          email: tutor.email,
          telefone: tutor.telefone,
        },
        pacientes,
      }
    })

    return tutoresComPacientes
  }

  async criarTutor(
    nome: string,
    email: string,
    telefone: string,
  ): Promise<ITutor> {
    const tutorExistente = await this.repository.buscarTutorPorEmail(email)
    if (tutorExistente) {
      throw createError(409, 'Este email já foi cadastrado')
    }
    return await this.repository.criarTutor(nome, email, telefone)
  }

  async atualizarTutor(
    id: number,
    nome: string,
    email: string,
    telefone: string,
  ): Promise<ITutor> {
    const tutorExistente = await this.repository.buscarTutorPorId(id)
    if (!tutorExistente) {
      throw createError(404, 'Tutor não encontrado')
    }
    tutorExistente.nome = nome
    tutorExistente.email = email
    tutorExistente.telefone = telefone

    const tutorAtualizado = await this.repository.atualizarTutor(tutorExistente)

    return tutorAtualizado
  }
  async deletarTutor(id: number): Promise<void> {
    const tutorExistente = await this.repository.buscarTutorPorId(id)

    if (!tutorExistente) {
      throw createError(404, 'Tutor não encontrado')
    }

    if (tutorExistente.pacientes && tutorExistente.pacientes.length > 0) {
      this.pacienteRepository.deletarPacientes(tutorExistente.pacientes)
    }
    await this.repository.deletarTutor(tutorExistente)
  }
}
