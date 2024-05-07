import { Sequelize, DataTypes, Model } from 'sequelize'

export interface TutorAttributes {
  id: number
  nome: string
  email: string
  telefone: string
}

export interface TutorInstance
  extends Model<TutorAttributes>,
    TutorAttributes {}

export default function defineTutorModel(sequelize: Sequelize) {
  const Tutor = sequelize.define<TutorInstance>(
    'Tutor',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'Tutor',
    },
  )

  return Tutor
}
