import { getRepository } from 'typeorm';
import { Paciente } from '../models/pacienteModel';
import { Tutor } from '../models/tutorModel';
import { PacienteRepository } from '../repositories/pacienteRepository';

export class PacienteService {
  static async buscarPacientesPorTutor(tutorId: number): Promise<Paciente[]> {
    const pacienteRepository = getRepository(Paciente);
    return await pacienteRepository.find({ where: { tutor: { id: tutorId}  }, relations: ['tutor'] });
  }
  static async buscarPaciente(pacienteId: number, tutorId: number): Promise<Paciente[]> {
    const pacienteRepository = getRepository(Paciente);
    return await pacienteRepository.find({ where: { id : pacienteId, tutor: { id: tutorId} }, relations: ['tutor'] });
  }
  static async listarPacientes(): Promise<Paciente[]> {
    const pacienteRepository = getRepository(Paciente);
    return await pacienteRepository.find({ relations: ['tutor'] });
  }
  static async criarPaciente(nome: string, especie: string, tutorId: number): Promise<Paciente> {
    const pacienteRepository = getRepository(Paciente);
    const tutorRepository = getRepository(Tutor);

    if (!nome || !especie) {
      const error: CustomError = new Error('O nome e a espécie do paciente são obrigatórios');
      error.status = 400; 
      throw error; 
    }
    const tutor = await tutorRepository.findOne({ where: { id: tutorId } });
    if (!tutor) {
      const error: CustomError = new Error('Tutor não encontrado');
      error.status = 404; 
      throw error; 
    }

    const proximoId = await PacienteRepository.proximoId();
    const novoPaciente = pacienteRepository.create({
      id: proximoId,
      nome,
      especie,
      tutor : tutor,
    });

    await pacienteRepository.save(novoPaciente);

    return novoPaciente;
  }
  static async atualizarPaciente(pacienteId: number, tutorId: number, nome: string, especie: string): Promise<Paciente> {
    const pacienteRepository = getRepository(Paciente);


    if (!nome || !especie) {
      const error: CustomError = new Error('O nome e a espécie do paciente são obrigatórios');
      error.status = 400; 
      throw error; 
    }

    const pacienteExistente = await pacienteRepository.findOne({ where: { id: pacienteId, tutor: { id: tutorId} }, relations: ['tutor'] })
    if (!pacienteExistente) {
      const error: CustomError = new Error('Paciente não encontrado');
      error.status = 404; 
      throw error; 
    }

    pacienteExistente.nome = nome;
    pacienteExistente.especie = especie;

    const pacienteAtualizado = await pacienteRepository.save(pacienteExistente);

    return pacienteAtualizado;
  }

  static async deletarPaciente(pacienteId: number, tutorId: number): Promise<number> {
    const pacienteRepository = getRepository(Paciente);

    const deleted = await pacienteRepository.delete({ id: pacienteId, tutor: { id: tutorId } });
    return deleted.affected || 0;
  }
  
}
