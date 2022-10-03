<h1>Storage Manager Project</h1>

A aplicação trata-se de uma API com endpoints para gerenciamento de uma loja. 
Os diversos endpoints permitem criar, ler, deletar e atualizar informações sobre produtos e vendas num banco de dados MySQL. 
Conta com cobertura de testes unitários e validações das informações.


<h2>Tecnologias utilizadas::</h2>

- Node.js

- Express

- MySQL

- Docker

- Mocha

- Chai

- Sinon



<h2>Rotas da API:</h2>

<h3>Produtos</h3>

<i>GET</i>

/products = Lista todos os produtos;

/products/:id = Retorna o produto com o id presente na URL;


<i>POST</i>

/products = Cadastra um novo produto no banco de dados;


<i>PUT</i>

/products/:id = Edita informações sobre o produto com o id presente na URL;


<i>DELETE</i>

/products/:id = Deleta informações sobre o produto com o id presente na URL;




<h3>Vendas</h3>


<i>GET</i>

/sales = Lista todas as vendas;

/sales/:id = Retorna a venda com o id presente na URL;


<i>POST</i>

/sales = Cadastra uma nova venda no banco de dados;


<i>DELETE</i>

/sales/:id = Deleta informações sobre a venda com o id presente na URL;



