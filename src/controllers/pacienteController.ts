import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Paciente } from '../models/pacienteModel';
import { Tutor } from '../models/tutorModel'; 

class PacienteController {
  static async criarPaciente(req: Request, res: Response) {
    try {
      const pacienteRepository = getRepository(Paciente);
      const tutorRepository = getRepository(Tutor);
      const { nome, especie } = req.body;
      
      if(!nome || !especie){
        return res.status(400).json({ message: 'O nome e a espécie do paciente são obrigatórios' });
      }

      const tutorId = parseInt(req.params.tutorId);
      const tutor = await tutorRepository.findOne({ where: { id: tutorId } });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor não encontrado' });
      }

      let proximoId = 1;
      const maxId = await pacienteRepository.createQueryBuilder("paciente")
        .select("MAX(paciente.id)", "maxId")
        .getRawOne();
      
      if (maxId && maxId.maxId != null) {
        proximoId = parseInt(maxId.maxId) + 1;
      }

      const novoPaciente = pacienteRepository.create({
        id: proximoId,
        nome: nome,
        especie: especie,
        tutor: tutor,
      });

      await pacienteRepository.save(novoPaciente);
      
      return res.status(200).json(novoPaciente);
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      res.status(500).json({ message: 'Erro ao criar paciente' });
    }
  }

  static async atualizarPaciente(req: Request, res: Response) {
    try {
      const pacienteRepository = getRepository(Paciente);
      const pacienteId = parseInt(req.params.pacienteId);
      const tutorId = parseInt(req.params.tutorId);
      
      const tutorExistente = await getRepository(Tutor).findOne({ where: { id: tutorId } });
      if (!tutorExistente) {
        return res.status(404).json({ error: 'Tutor não encontrado' });
      }
  
      const { nome, especie } = req.body;
      if(!nome || !especie){
        return res.status(400).json({ message: 'O nome e a espécie do paciente são obrigatórios' });
      }
  
      const pacienteExistente = await pacienteRepository.findOne({ where: { id: pacienteId } });
      if (!pacienteExistente) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
  
      pacienteExistente.nome = nome;
      pacienteExistente.especie = especie;
      pacienteExistente.tutor = tutorExistente; 
      
      const pacienteAtualizado = await pacienteRepository.save(pacienteExistente);
      
      return res.status(200).json(pacienteAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  }
  

  static async deletarPaciente(req: Request, res: Response) {
    const pacienteId = parseInt(req.params.pacienteId);
    const tutorId = parseInt(req.params.tutorId);
    try {
      const pacienteRepository = getRepository(Paciente);
      const deleted = await pacienteRepository.delete({ id: pacienteId, tutor: { id: tutorId } });
      if (deleted.affected === 1) {
        return res.status(204).send();
      }
      throw new Error('Paciente não encontrado');
    } catch (error) {
      console.error('Erro ao deletar paciente:', error);
      res.status(500).json({ error: 'Erro ao deletar paciente' });
    }
  }
}

export default PacienteController;
