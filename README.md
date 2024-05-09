# Projeto VetClinic :dog:

Este é um projeto para uma clínica veterinária fictícia, desenvolvido com TypeScript, Express.js e TypeOrm.

## Descrição

O Projeto VetClinic é uma aplicação para gerenciamento de tutores e pacientes de uma clínica veterinária. Ele permite a criação, atualização, listagem e remoção de tutores e pacientes, além de fornecer documentação da API utilizando Swagger.

## Tecnologias Utilizadas

- TypeScript
- Express.js
- TypeOrm
- Prettier
- Swagger

## Configuração

1. **Instalação de Dependências:**

   Antes de iniciar o projeto, certifique-se de instalar todas as dependências necessárias. Você pode fazer isso executando:

   ```bash
   npm install
   ```

2. **Configuração do Banco de Dados:**

   Certifique-se de configurar corretamente o banco de dados no arquivo `.env` com as variáveis `DB_DIALECT` e `DB_STORAGE`.

3. **Compile os arquivos TypeScript:**

   Para compilar arquivos TypeScript, execute o seguinte comando, com isto serão gerados arquivos JavaScript que seu navegador conseguirá interpretar:

   ```bash
   tsc
   ```

4. **Execução do Projeto:**

   Para iniciar o servidor, execute o seguinte comando:

   ```bash
   npm start
   ```

   O servidor estará disponível em `http://localhost:3000`.

## Uso

Após iniciar o servidor, você pode começar a fazer solicitações à API utilizando ferramentas como Postman ou cURL. Consulte a documentação Swagger em `http://localhost:3000/api-docs` para obter informações sobre os endpoints disponíveis e seus parâmetros.

**Exemplo de comando**

```bash
No Postman sete sua url para POST http://localhost:3000/api/paciente/1
E adicione ao Body - raw o seguinte json
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
