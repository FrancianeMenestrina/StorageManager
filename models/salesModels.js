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
  INNER JOIN sales ON sales_products.sale_id = sales.id
  ORDER BY sales_products.sale_id, sales_products.product_id;`;
  const [result] = await connection.query(sql);
  return result;
};

const getSalesId = async (saleId) => {
    const sql = `SELECT date, product_id AS productId, quantity
  FROM StoreManager.sales_products
  INNER JOIN sales 
  ON sales_products.sale_id = sales.id
  WHERE id =?
  ORDER BY sales_products.product_id`;
    const [result] = await connection.query(sql, [saleId]);
  console.log('result modesl', result);
    return result;
};

module.exports = {
  createSales,
  getSalesId,
  allSales,
};
