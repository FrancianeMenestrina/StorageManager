const connection = require('./connection');

const createSales = async (products) => {
  try {
    const sqlSale = `
    INSERT INTO StoreManager.sales(date)
    VALUES (now())`;

    const [result] = await connection.query(sqlSale);

    products.forEach(async (product) => {
      const sqlSaleProducts = `INSERT INTO StoreManager.sales_products(product_id,sale_id,quantity)
      VALUES (?, ?, ?);`;
      await connection.query(sqlSaleProducts, [
        product.productId,
        result.insertId,
        product.quantity,
      ]);
    });

    return { id: result.insertId, itemsSold: products };
  } catch (error) {
    return error;
  }
};

const allSales = async () => {
  const sql = `SELECT sale_id AS saleId, date, product_id AS productId, quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales ON StoreManager.sales_products.sale_id = StoreManager.sales.id
  ORDER BY StoreManager.sales_products.sale_id, StoreManager.sales_products.product_id;`;
  const [result] = await connection.query(sql);
  return result;
};

const getSalesId = async (saleId) => {
    const sql = `SELECT sales.date, sales_products.product_id AS productId, sales_products.quantity
  FROM StoreManager.sales_products
  INNER JOIN StoreManager.sales 
  ON StoreManager.sales_products.sale_id = StoreManager.sales.id
  WHERE id =?
  ORDER BY StoreManager.sales_products.product_id`;
    const [result] = await connection.query(sql, [saleId]);
  console.log('result modesl', result);
    return result;
};

const deleteSale = async (id) => {
  const sql = `DELETE FROM StoreManager.sales
WHERE StoreManager.sales.id = ?`;
  const [result] = await connection.query(sql, [id]);
  return result;
};

module.exports = {
  createSales,
  getSalesId,
  allSales,
  deleteSale,
};
