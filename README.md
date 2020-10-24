# Som Web

Som Web é frontend do Sistema Operacional da Música (S.O.M).

Este é um projeto open source em ReactJS.

## Tabela de Conteúdo

- [Instalação](#instalação)
  - [Usando Node.js](#via-nodejs)
  - [Usando Docker](#via-docker)
- [Dependências](#dependências)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
  - [Obrigatórias](#obrigatórias)
  - [Opcionais](#opcionais)


## Instalação

Para começar, é necessário clonar (baixar para sua máquina usando o git) ou fazer o download do arquivo ZIP do projeto.

Para utilizar o git, certifique-se que possui instalado em sua máquina com:

`$ git --version`

Obs.: Aqui qualquer versão é válida.

Para clonar, use o terminal de seu computador e execute o seguinte comando na sua pasta de preferência:

`$ git clone git@github.com:midianinja/som-web.git`

Este projeto é melhor executado usando a versão 10 do Node.js.

Você pode instalá-la diretamente seguindo as instruções no [site](https://nodejs.org/dist/latest-v10.x/) ou usando um gerenciador de versões como o [nvm](https://github.com/nvm-sh/nvm).

Também é possível executar o projeto usando Docker.

### Via Node.js

Certifique-se que você está utilizando a versão correta do Node com:

`$ node --version`

Se a versão for 10.x.x, você já pode instalar as dependências com:

`$ npm install`

Ou se preferir usar yarn com:

`$ yarn install`

Após instaladas todas as dependências, inicie o projeto com:

`$ npm run dev` ou `$ yarn dev`

Também é necessário rodar o processo de build:

`$ npm run build` ou `$ yarn build`

Agora basta acessar `localhost:8080`.

### Via Docker

Certifique-se que você possui o Docker instalado.

Construa a imagem com o seguinte comando:

`$ docker build -f Dockerfile -t som-web .`

Assim você terá uma imagem do projeto nomeada `som-web`.

Para iniciar o projeto e expô-lo na porta 3000:

`$ docker run -p 8080:3000 som-web`

Agora basta acessar `localhost:3000`.

## Dependências

Para o projeto funcionar corretamente é necessário executas algumas dependências juntamente:

* [ida-auth-serverless](https://github.com/midianinja/ida-auth-serverless)
* [GraphQL](https://github.com/midianinja/som-graphql-api)
* [Storage](https://github.com/midianinja/som-storage-server-api)

## Variáveis de Ambiente

Crie um arquivo na raiz do projeto chamado `.env`.

```
PORT=
NODE_ENV=
GRAPH_API_URI=
AUTH_API_URI=
STORAGE_API_URI=
REPOSITORY_URI=
INSTAGRAM_API_URI=
```
### Obrigatórias
* `GRAPH_API_URI` é a URL da aplicação GraphQL
* `AUTH_API_URI` é a URL da IDA
* `STORAGE_API_URI` é a URL do Storage.

### Opcionais
* `PORT` é em que porta a aplicação rodará.
* `NODE_ENV` é qual tipo de ambiente você está executando, geralmente `development`
* `INSTAGRAM_API_URI` é a URL da API de Instagram do Mídia Ninja.
