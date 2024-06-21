import { Repository } from 'typeorm'
import { ITutor } from '../interfaces/tutorInterface'
import { Tutor } from '../models/tutorModel'
import AppDataSource from '../database/conexao'

export class TutorRepository {
  private repository: Repository<Tutor>

  constructor() {
    this.repository = AppDataSource.getRepository(Tutor)
  }

  async listarTutores() {
    return this.repository.find()
  }

  async listarTutoresPacientes() {
    return this.repository.find({ relations: ['pacientes'] })
  }

  async buscarTutorPorEmail(email: string): Promise<ITutor | null> {
    const tutor = await this.repository.findOne({ where: { email } })
    return tutor
  }

  async criarTutor(
    nome: string,
    email: string,
    telefone: string,
  ): Promise<ITutor> {
    const novoTutor = this.repository.create({ nome, email, telefone })
    await this.repository.save(novoTutor)
    return novoTutor
  }

  async buscarTutorPorId(id: number): Promise<Tutor | null> {
    const tutor = await this.repository.findOne({
      where: { id },
      relations: ['pacientes'],
    })
    return tutor || null
  }
  async buscarTutorPorIdSemRelations(id: number): Promise<Tutor | null> {
    const tutor = await this.repository.findOne({
      where: { id },
    })
    return tutor || null
  }

  async atualizarTutor(tutor: ITutor): Promise<ITutor> {
    return await this.repository.save(tutor)
  }

  async deletarTutor(tutorExistente: Tutor): Promise<void> {
    await this.repository.remove(tutorExistente)
  }
}
