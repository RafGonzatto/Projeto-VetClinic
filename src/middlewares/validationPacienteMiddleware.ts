import { Request, Response, NextFunction } from 'express';
import { pacienteSchema } from '../validators/pacienteValidator'

export const validationPacienteMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { nome, especie, dataNascimento, tutorId } = req.body;
  const validation = pacienteSchema.safeParse({
    nome,
    especie,
    dataNascimento,
    tutorId,
  });

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((error) => error.message);
    const errorMessage = errorMessages.join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  next();
};
