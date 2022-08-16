const express = require('express');
const app = require('./app');

app.use(express.json());
const controllers = require('./controllers/produtctControllers');
const constrollersSales = require('./controllers/salesControllers');

app.get('/products', controllers.allProducts);

app.get('/products/:id', controllers.getProdutctsId);

app.post('/products', controllers.createProduct);

app.post('/sales', constrollersSales.createSales);

app.get('/sales', constrollersSales.allSales);

app.get('/sales/:id', constrollersSales.getSalesId);

require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
