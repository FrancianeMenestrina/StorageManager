const express = require('express');
const app = require('./app');

app.use(express.json());
const controllersProducts = require('./controllers/produtctControllers');
const controllersSales = require('./controllers/salesControllers');

app.get('/products', controllersProducts.allProducts);

app.get('/products/:id', controllersProducts.getProdutctsId);

app.post('/products', controllersProducts.createProduct);

app.post('/sales', controllersSales.createSales);

app.get('/sales', controllersSales.allSales);

app.get('/sales/:id', controllersSales.getSalesId);

app.put('/products/:id', controllersProducts.updateProduct);

app.delete('/products/:id', controllersProducts.deleteProduct);

require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
