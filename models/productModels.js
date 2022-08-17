const connection = require('./connection');

const allProducts = async () => {
  const sql = 'SELECT * FROM StoreManager.products;';
  const [result] = await connection.query(sql);
  return result;
};

const getProdutctsId = async (id) => {
  try {
    const sql = 'SELECT * FROM StoreManager.products WHERE id =?';
    const [[result]] = await connection.query(sql, [id]);
    return result;
  } catch (error) {
    return undefined;
  }
};

const updateProduct = async (id, name) => {
  //  console.log('result 10models', name, id);
  const sql = `UPDATE StoreManager.products SET
   StoreManager.products.name = ? WHERE StoreManager.products.id = ?`;
  const [result] = await connection.query(sql, [name, id]);
  return result;
};

const deleteProduct = async (id) => {
  const sql = `DELETE FROM StoreManager.products
WHERE StoreManager.products.id = ?`;
  const [result] = await connection.query(sql, [id]);
  return result;
};

const createProduct = async ({ name }) => {
  const sql = `
  INSERT INTO StoreManager.products(name)
  VALUES (?)`;

  const [result] = await connection.query(sql, [name]);
  return getProdutctsId(result.insertId);
};

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
  updateProduct,
  deleteProduct,
};
