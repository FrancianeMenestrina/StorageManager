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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  // console.log('name', name);
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  const result2 = await ProductsServices.getProdutctsId(id);
  if (!result2) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const result = await ProductsServices.updateProduct(id, name);
  const result3 = await ProductsServices.getProdutctsId(id);
  console.log('result CONTROLER', result);
  return res.status(200).json(result3);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  // console.log('id', id);
  const result2 = await ProductsServices.getProdutctsId(id);
  if (!result2) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const result = await ProductsServices.deleteProduct(id);
  const result3 = await ProductsServices.getProdutctsId(id);
  console.log('result CONTROLER', result);
  return res.status(204).json(result3);
};

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
  updateProduct,
  deleteProduct,
};
