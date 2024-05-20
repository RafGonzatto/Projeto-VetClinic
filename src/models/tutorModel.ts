import {
  Entity,
  Column,
  BaseEntity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Paciente } from './pacienteModel'
import { ITutor } from '../interfaces/tutorInterface'

@Entity('Tutor')
export class Tutor extends BaseEntity implements ITutor {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  nome!: string

  @Column({ nullable: false, unique: true })
  email!: string

  @Column({ nullable: false })
  telefone!: string

  @OneToMany(() => Paciente, (paciente) => paciente.tutor)
  pacientes!: Paciente[]
}
