import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Tutor } from './tutorModel'
import { IPaciente } from '../interfaces/pacienteInterface'

@Entity('Paciente')
export class Paciente extends BaseEntity implements IPaciente {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: false })
  nome!: string

  @Column({ nullable: false })
  especie!: string

  @Column({ nullable: false })
  dataNascimento!: string

  @ManyToOne(() => Tutor, { nullable: false })
  @JoinColumn({ name: 'tutorId' })
  tutor!: Tutor
}
