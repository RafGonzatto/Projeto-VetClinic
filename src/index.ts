import express, { Request, Response, NextFunction } from 'express'
import routes from './routes/routes'
import sequelize from '../database/conexao'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import defineModels, { Models } from './models/RepositorioModels'

const app = express()
const PORT = 3000
app.use((req: Request, res: Response, next: NextFunction) => {
  req.context = {
    db: sequelize,
  }
  next()
})
app.use(express.json())

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API da VetClinic',
      version: '1.0.0',
      description: 'Documentação da API do Projeto VetClinic',
    },
  },
  apis: [`${__dirname}/routes/routes.ts`],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/', routes)

const models: Models = defineModels(sequelize)

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((error: any) => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', error)
  })
