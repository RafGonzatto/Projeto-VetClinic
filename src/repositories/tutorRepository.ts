// TutorRepository.ts
import { getRepository } from 'typeorm';
import { Tutor } from '../models/tutorModel';

export class TutorRepository {
  static async criarTutor(nome: string, email: string, telefone: string): Promise<Tutor> {
    const tutorRepository = getRepository(Tutor);
    const proximoId = await this.proximoId();
    const novoTutor = tutorRepository.create({ id: proximoId, nome, email, telefone });
    await tutorRepository.save(novoTutor);
    return novoTutor;
  }

  private static async proximoId(): Promise<number> {
    const tutorRepository = getRepository(Tutor);
    const maxId = await tutorRepository.createQueryBuilder("tutor")
      .select("MAX(tutor.id)", "maxId")
      .getRawOne();
      
    return maxId && maxId.maxId != null ? parseInt(maxId.maxId) + 1 : 1;
  }

  static async buscarTutorPorId(id: number): Promise<Tutor | null> {
    const tutorRepository = getRepository(Tutor);
    const tutor = await tutorRepository.findOne({ where: { id } });
    return tutor || null;
  }

  static async atualizarTutor(tutor: Tutor): Promise<Tutor> {
    const tutorRepository = getRepository(Tutor);
    return await tutorRepository.save(tutor);
  }
  
  static async deletarTutor(id: number): Promise<void> {
    await TutorRepository.deletarTutor(id);
  }
}
