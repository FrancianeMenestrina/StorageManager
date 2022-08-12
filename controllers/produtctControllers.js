const ProductsServices = require('../services/produtctServices');

const allProducts = async (req, res) => {
  const result = await ProductsServices.allProducts();
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const getProdutctsId = async (req, res) => {
  const { id } = req.params;
  const result = await ProductsServices.getProdutctsId(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(result);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  const result = await ProductsServices.createProduct(name);
  return res.status(201).json(result);
};

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
};
