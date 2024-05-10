import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/routes';
import conexao from '../database/conexao'; 
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  (req as any).context = {
    db: conexao, 
  };
  next();
});


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
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', routes);
conexao
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
