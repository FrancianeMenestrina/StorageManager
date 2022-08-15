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

const createProduct = async ({ name }) => {
  const sql = `
  INSERT INTO StoreManager.products(name)
  VALUES (?)`;

  const [result] = await connection.query(sql, [name]);
  // const sqlSelect = 'SELECT * FROM StoreManager.products WHERE id =?';
  // const [[resultSelect]] = await connection.query(sqlSelect, [result.insertId]);
  return getProdutctsId(result.insertId);
};

module.exports = {
  allProducts,
  getProdutctsId,
  createProduct,
};
