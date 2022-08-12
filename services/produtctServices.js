const productsModels = require('../models/productModels');

const allProducts = async () => productsModels.allProducts();

const getProdutctsId = async (id) => {
  const result = await productsModels.getProdutctsId(id);
  if (!result) return false;
  return result;
};

const createProduct = async (name) => productsModels.createProduct({ name });

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
};