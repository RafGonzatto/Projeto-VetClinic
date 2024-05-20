import { Paciente } from '../models/pacienteModel'

export interface ITutor {
  id: number
  nome: string
  email: string
  telefone: string
  pacientes: Paciente[]
}
