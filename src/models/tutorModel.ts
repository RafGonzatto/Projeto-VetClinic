import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Paciente } from './pacienteModel'; 

@Entity('Tutor')
export class Tutor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  nome?: string;

  @Column({ nullable: false, unique: true })
  email?: string;

  @Column({ nullable: false })
  telefone?: string;

  @OneToMany(() => Paciente, paciente => paciente.tutor)
  pacientes?: Paciente[];

  constructor() {
    super();
    this.id = 1; 
    this.nome = '';
    this.email = '';
    this.telefone = '';
  }
}