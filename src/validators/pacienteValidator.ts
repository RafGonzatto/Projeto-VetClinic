import { z } from 'zod'

export const pacienteSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  especie: z.string().min(1, 'Especie é obrigatório'),
  dataNascimento: z
    .string()
    .min(1, 'Data de Nascimento é obrigátorio')
    .regex(/^\d{2}-\d{2}-\d{4}$/),
  tutorId: z.number().int().min(1, 'Id do tutor é obrigatório'),
})
