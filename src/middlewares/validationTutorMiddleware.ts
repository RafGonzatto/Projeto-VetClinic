import { Request, Response, NextFunction } from 'express';
import { tutorSchema } from '../validators/tutorValidator';

export const validationTutorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { nome, email, telefone } = req.body;

  const validation = tutorSchema.safeParse({ nome, email, telefone });

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((error) => error.message);
    const errorMessage = errorMessages.join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  next();
};
