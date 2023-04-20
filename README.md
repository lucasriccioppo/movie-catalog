## Movie Catalog

API para buscar e salvar filmes favoritos.

A Api utiliza como base a api da OMDB. Para evitar requisições em excesso a aplicação está utilizando cache e salvando os filmes buscados recentemente.

#### Rodando o projeto

Primeiramente é necessário instalar as dependências do projeto:

`npm install`

ou

`yarn install`

Para fins de desenvolvimento foi criado o arquivo .env.sample, para que não fosse necessário subir o arquivo .env (questões de segurança). O .env.sample tem armazenado as variáveis de ambiente para ambiente local. Criar um arquivo .env através do comando:

`cp .env.sample .env`

Depois inicializar o banco de dados através do comando:

`docker-compose up`

e então subir a aplicação:

`npm run start:dev`

ou

`yarn start:dev`

#### Documentação

Foi implementada um documentação do _Swagger_ na aplicação. Através de lá é possível consultar e chamar os endpoits da api. Para acessar, basta ter a aplicação rodando e acessar no navegador a seguinte url:

`http://localhost:3000/docs`

(caso a variável de ambiente PORT tenha sido alterada, é necessário alterar a porta 3000 na url acima para o valor setado no .env)

### Deploy

Foi feito o deploy da aplicação da plataforma Railway, disponível através da url:

`movie-catalog-production-128e.up.railway.app`

Para facilitar a verificação, também foi disponibilizado a documentação do _Swagger_ no ambiente de deploy, disponível em:

`movie-catalog-production-128e.up.railway.app/docs`
