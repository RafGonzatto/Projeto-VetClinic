import { z } from 'zod'

const tutorSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Formato de email inválido'),
  telefone: z.string().min(1, 'Telefone é obrigatório'),
})

export { tutorSchema }
