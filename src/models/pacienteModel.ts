import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Tutor } from './tutorModel'

@Entity('Paciente')
export class Paciente extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ nullable: false })
  nome?: string

  @Column({ nullable: false })
  especie?: string

  @Column({ nullable: false })
  dataNascimento?: string

  @ManyToOne(() => Tutor, { nullable: false })
  @JoinColumn({ name: 'tutorId' })
  tutor?: Tutor

  constructor() {
    super()
    this.id = 1
    this.nome = ''
    this.especie = ''
    this.dataNascimento = ''
    this.tutor = new Tutor()
  }
}
