# Projeto VetClinic :dog:

Este é um projeto para uma clínica veterinária fictícia, desenvolvido com TypeScript, Express.js e TypeOrm.

## Descrição

O Projeto VetClinic é uma aplicação para gerenciamento de tutores e pacientes de uma clínica veterinária. Ele permite a criação, atualização, listagem e remoção de tutores e pacientes, além de fornecer documentação da API utilizando Swagger.

## Tecnologias Utilizadas

- TypeScript@^5.4.5
- Express.js@^4.19.2
- TypeOrm@^0.3.20
- Prettier@^3.2.5
- Swagger-jsdoc@^6.2.8
- Swagger-ui-express@^5.0.0
- Nodemon@^3.1.0
- Concurrently@^8.2.2

## Configuração

1. **Instalação de Dependências:**

   Antes de iniciar o projeto, certifique-se de instalar todas as dependências necessárias. Você pode fazer isso executando:

   ```bash
   npm install
   ```

2. **Configuração do Banco de Dados:**

   Certifique-se de configurar corretamente o banco de dados no arquivo `.env` com a variável `DB_PATH` com o caminho onde ficará seu banco de dados.

3. **Compilação e Execução dos arquivos TypeScript:**

   Para compilar arquivos TypeScript, execute o seguinte comando. Isso gerará arquivos JavaScript que seu servidor poderá interpretar e já executara o projeto:

   ```bash
   npm run dev
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Uso

Após iniciar o servidor, você pode começar a fazer solicitações à API utilizando ferramentas como Postman ou cURL. Consulte a documentação Swagger em `http://localhost:3000/api-docs` para obter informações sobre os endpoints disponíveis e seus parâmetros.

**Exemplo de comando**

```bash
No Postman, configure sua URL para POST http://localhost:3000/api/paciente/1
E adicione ao Body - raw o seguinte JSON:

{
 "nome": "Fidorento",
 "especie": "Cachorro dos Lagos"
}
```

## Contribuição :tiger:

Contribuições são bem-vindas! Se você quiser contribuir para este projeto, siga estas etapas:

1. Faça um fork do repositório
2. Crie uma nova branch (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um pull request
