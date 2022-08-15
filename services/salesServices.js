const salesModels = require('../models/salesModels');

const createSales = async (products) => salesModels.createSales(products);

module.exports = {
  salesModels,
  createSales,
};