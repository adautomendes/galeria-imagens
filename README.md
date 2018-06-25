# galeria-imagens
Um pequeno exemplo didático de como se montar uma galeria de imagens utilizando Express com AJAX.

## Dependências
Banco de Dados MySQL instalado.

## Backend
* [Express](http://expressjs.com/) - Framework de aplicação WEB em NodeJS
* [MySQL](https://www.npmjs.com/package/mysql) - Plugind de conexão com o BD

## Frontend
* [jQuery](https://jquery.com/) - Biblioteca Javascript
* [MaterializeCSS](https://materializecss.com/) - Framework CSS para estilização do HTML

## Deployment
* Execute 'galeria.sql' no seu MySQL
* Configure a variável 'con' no arquivo backend/index.js com as suas configurações do MySQL
* Abra o terminal na pasta 'backend' e execute o comando abaixo para instalar as dependências do NodeJS:
```
npm install
```
* Execute o comando abaixo para subir o servidor:
```
node index.js
```
* Abra o arquivo cards.html ou list.html da pasta 'frontend'.

## Funcionamento
Toda vez que o servidor for iniciado, a pasta 'backend/imagens' será varrida e o banco de dados populado com as informações de todas as imagens ali presentes. Posteriormente é possível acessar os dados das imagens no frontend.