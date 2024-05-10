import { getRepository } from 'typeorm'
import { Paciente } from '../models/pacienteModel'

export class PacienteRepository {
  static async proximoId(): Promise<number> {
    const pacienteRepository = getRepository(Paciente)
    const maxId = await pacienteRepository
      .createQueryBuilder('paciente')
      .select('MAX(paciente.id)', 'maxId')
      .getRawOne()

    return maxId && maxId.maxId != null ? parseInt(maxId.maxId) + 1 : 1
  }
}
