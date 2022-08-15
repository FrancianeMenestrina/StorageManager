const connection = require('./connection');

const createSales = async (products) => {
  try {
    const sqlSale = `
    INSERT INTO sales(date)
    VALUES (now())`;

    const [result] = await connection.query(sqlSale);

    products.forEach(async (product) => {
      const sqlSaleProducts = `INSERT INTO sales_products(product_id,sale_id,quantity)
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

module.exports = {
  createSales,
};
