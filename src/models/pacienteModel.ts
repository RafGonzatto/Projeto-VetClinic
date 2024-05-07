import { Sequelize, DataTypes, Model } from 'sequelize'

export interface PacienteAttributes {
  id: number
  nome: string
  especie: string
  tutorId: number
}

export interface PacienteInstance
  extends Model<PacienteAttributes>,
    PacienteAttributes {}

export default function definePacienteModel(sequelize: Sequelize) {
  const Paciente = sequelize.define<PacienteInstance>(
    'Paciente',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tutorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'Paciente',
    },
  )
  return Paciente
}
