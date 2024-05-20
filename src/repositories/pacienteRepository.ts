import { Repository } from 'typeorm'
import { Paciente } from '../models/pacienteModel'
import { ITutor } from '../interfaces/tutorInterface'
import { IPaciente } from '../interfaces/pacienteInterface'
import AppDataSource from '../database/conexao'

export class PacienteRepository {
  private repository: Repository<Paciente>

  constructor() {
    this.repository = AppDataSource.getRepository(Paciente)
  }
  async buscarPaciente(pacienteId: number, tutorId: number) {
    let paciente = await this.repository.findOne({
      where: { id: pacienteId, tutor: { id: tutorId } },
      relations: ['tutor'],
    })
    return paciente || null
  }
  async buscarPacientesTutor(tutorId: number) {
    return await this.repository.find({
      where: { tutor: { id: tutorId } },
      relations: ['tutor'],
    })
  }

  async listarPacientes() {
    return await this.repository.find({ relations: ['tutor'] })
  }

  async criarPaciente(
    nome: string,
    especie: string,
    dataNascimento: string,
    tutor: ITutor,
  ) {
    let paciente = this.repository.create({
      nome,
      especie,
      dataNascimento,
      tutor,
    })
    await this.repository.save(paciente)
    return paciente
  }
  async atualizarPaciente(paciente: IPaciente): Promise<IPaciente> {
    await this.repository.save(paciente)
    return paciente
  }
  async deletarPaciente(pacienteId: number, tutorId: number): Promise<void> {
    await this.repository.delete({
      id: pacienteId,
      tutor: { id: tutorId },
    })
  }
  async deletarPacientes(pacientes: Paciente[]): Promise<void> {
    await this.repository.remove(pacientes)
  }
}
