const productsModels = require('../models/productModels');

const allProducts = async () => productsModels.allProducts();

const getProdutctsId = async (id) => {
  const result = await productsModels.getProdutctsId(id);
  if (!result) return false;
  return result;
};

const updateProduct = async (id, name) => {
  const result = await productsModels.updateProduct(id, name);
  console.log('result 10', result);
  if (!id) return false;
  return result;
};

const createProduct = async (name) => productsModels.createProduct({ name });

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
  updateProduct,
};