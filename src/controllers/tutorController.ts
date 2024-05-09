import { Request, Response } from 'express';
import { getRepository, getConnection  } from 'typeorm';
import { Tutor } from '../models/tutorModel';
import { Paciente } from '../models/pacienteModel';

class TutorController {
  static async listarTutores(req: Request, res: Response) {
    try {
      const tutorRepository = getRepository(Tutor);
      const tutores = await tutorRepository.find();
      
      if (tutores.length === 0) {
        return res.status(200).json({ message: 'Não há nenhum tutor cadastrado' });
      }
      
      return res.status(200).json(tutores);
    } catch (error) {
      console.error('Erro ao listar tutores:', error);
      return res.status(500).json({ error: 'Erro ao listar tutores' });
    }
  }

  static async criarTutor(req: Request, res: Response) {
    try {
      const tutorRepository = getRepository(Tutor);
      const { nome, email, telefone } = req.body;
      
      if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
      }

      let proximoId = 1;
      const maxId = await tutorRepository.createQueryBuilder("tutor")
        .select("MAX(tutor.id)", "maxId")
        .getRawOne();
      
      if (maxId && maxId.maxId != null) {
        proximoId = parseInt(maxId.maxId) + 1;
      }
      
      const novoTutor = tutorRepository.create({ id: proximoId, nome, email, telefone });
      await tutorRepository.save(novoTutor);
  
      return res.status(201).json(novoTutor);
    } catch (error) {
      console.error('Erro ao criar tutor:', error);
      return res.status(500).json({ error: 'Erro ao criar tutor' });
    }
  }
  
  static async atualizarTutor(req: Request, res: Response) {
    try {
      const tutorRepository = getRepository(Tutor);
      const { id } = req.params;
      const { nome, email, telefone } = req.body;
      if (!nome || !email || !telefone) {
        return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios' });
      }
      
  
      const tutorExistente = await tutorRepository.findOne({ where: { id: parseInt(id) } });
      if (!tutorExistente) {
        return res.status(404).json({ error: 'Tutor não encontrado' });
      }

      tutorExistente.nome = nome;
      tutorExistente.email = email;
      tutorExistente.telefone = telefone;
  
      const tutorAtualizado = await tutorRepository.save(tutorExistente);
  
      return res.status(200).json(tutorAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar tutor:', error);
      return res.status(500).json({ error: 'Erro ao atualizar tutor' });
    }
  }

  static async deletarTutor(req: Request, res: Response) {
    try {
      const tutorRepository = getRepository(Tutor);
      const pacienteRepository = getRepository(Paciente);
      const { id } = req.params;
  
      const tutorExistente = await tutorRepository.findOne({ where: { id: parseInt(id) }, relations: ['pacientes'] });
      if (!tutorExistente) {
        return res.status(404).json({ error: 'Tutor não encontrado' });
      }
  
      if (tutorExistente.pacientes && tutorExistente.pacientes.length > 0) {
        await pacienteRepository.remove(tutorExistente.pacientes);
      }
  
      await tutorRepository.remove(tutorExistente);
  
      return res.status(200).json({ message: 'Tutor e todos os seus pacientes excluídos com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir tutor e pacientes:', error);
      return res.status(500).json({ error: 'Erro ao excluir tutor e pacientes' });
    }
  }
}

export default TutorController;
