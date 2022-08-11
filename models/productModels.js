const connection = require('./connection');

  const allProducts = async () => {
    const sql = 'SELECT * FROM StoreManager.products;';
    const [result] = await connection.query(sql);
    return result;
    };
      
  const getProdutctsId = async (id) => {
    const sql = 'SELECT * FROM StoreManager.products WHERE id =?';
    const [[result]] = await connection.query(sql, [id]);
    return result;
  };

module.exports = {
  allProducts,
  getProdutctsId,
};