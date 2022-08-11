const productsModels = require('../models/productModels');

const allProducts = async () => productsModels.allProducts();

const getProdutctsId = async (id) => {
  const result = await productsModels.getProdutctsId(id);
  if (!result) return false;
  return result;
};

module.exports = {
  allProducts,
  getProdutctsId,
};