const salesModels = require('../models/salesModels');

const createSales = async (products) => salesModels.createSales(products);

const allSales = async () => salesModels.allSales();

const getSalesId = async (saleId) => {
  const result = await salesModels.getSalesId(saleId);
  console.log('result service', result);
  if (!result.length) return false;
  return result;
};

module.exports = {
  createSales,
  getSalesId,
  allSales,
};