const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const { DB_DIALECT, DB_STORAGE } = process.env

if (!DB_DIALECT || !DB_STORAGE) {
  throw new Error(
    'DB_DIALECT and DB_STORAGE must be defined in the environment variables',
  )
}

const sequelize = new Sequelize(DB_DIALECT, null, null, {
  dialect: DB_DIALECT,
  storage: DB_STORAGE,
})

export default sequelize
