import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import AppDataSource from './database/conexao'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const routerDir = path.join(__dirname, 'routes')

app.use((req: Request, res: Response, next: NextFunction) => {
  if (!AppDataSource.isInitialized) {
    console.error('Data Source has not been initialized!')
    res.status(500).json({ error: 'Data Source has not been initialized!' })
  } else {
    next()
  }
})

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API da VetClinic',
      version: '1.0.0',
      description: 'Documentação da API do Projeto VetClinic',
    },
  },

  apis: fs.readdirSync(routerDir).map((file) => path.join(routerDir, file)),
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

AppDataSource.initialize()
  .then(() => {
    app.use('/', require('./routes/routes').default)

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao banco de dados:', error)
    process.exit(1)
  })
