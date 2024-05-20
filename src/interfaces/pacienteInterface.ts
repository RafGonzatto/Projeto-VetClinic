import { Tutor } from '../models/tutorModel'

export interface IPaciente {
  id: number
  nome: string
  especie: string
  dataNascimento: string
  tutor: Tutor
}
