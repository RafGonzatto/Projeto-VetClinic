import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'
import { RepositorioModels } from '../models/RepositorioModels'

dotenv.config()

const { DB_PATH } = process.env

if (!DB_PATH) {
  throw new Error('DB_PATH must be defined in the environment variables')
}

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: path.resolve(__dirname, DB_PATH),
  synchronize: true,
  logging: true,
  entities: RepositorioModels,
})

export default AppDataSource
