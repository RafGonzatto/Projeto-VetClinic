import definePacienteModel from './pacienteModel'
import defineTutorModel from './tutorModel'
import { Sequelize } from 'sequelize'

const sequelizeModels = (sequelize: Sequelize) => {
  const Paciente = definePacienteModel(sequelize)
  const Tutor = defineTutorModel(sequelize)

  return {
    Paciente,
    Tutor,
  }
}

export type Models = ReturnType<typeof sequelizeModels>
export default sequelizeModels
