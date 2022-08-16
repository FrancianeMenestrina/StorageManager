const salesServices = require('../services/salesServices');
const ProductsServices = require('../services/produtctServices');
const SalesServices = require('../services/salesServices');

const isInvalidEmptyId = (products) => {
  const invalidEmptyId = products.some((product) => !product.productId);
  return invalidEmptyId;
};

const isInvalidQuantity = (products) => {
  const invalidqt = products.some((product) => product.quantity < 1);
  return invalidqt;
};

const isInvalidEmptyQuantity = (products) => {
  const invalidEmptyqt = products.some((product) => !product.quantity);
  return invalidEmptyqt;
};

const isProductNotFound = async (products) => {
  let productNotFound = false;
  const arrayDePromises = products.map(async (product) =>
    ProductsServices.getProdutctsId(product.productId));
  const promisesResolvidas = await Promise.all(arrayDePromises);
  productNotFound = promisesResolvidas.some((item) => !item);

  return productNotFound;
};

const allSales = async (req, res) => {
  const result = await SalesServices.allSales();
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(200).json(result);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  console.log('saleId', id);
  const result = await SalesServices.getSalesId(id);
  console.log(result);
  if (!result) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(result);
};

const createSales = async (req, res) => {
  const products = req.body;

  if (isInvalidEmptyId(products)) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (isInvalidQuantity(products)) {
    return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (isInvalidEmptyQuantity(products)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (await isProductNotFound(products)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const result = await salesServices.createSales(products);
  return res.status(201).json(result);
};

module.exports = {
  createSales,
  allSales,
  getSalesId,
};
