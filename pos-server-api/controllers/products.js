const db = require("../configs/database");

exports.fetchProduct = async () => {
  const query = db.query("SELECT * FROM products");
  return query;
};

exports.fetchProductByCategory = async (category) => {
  const query = db.query("SELECT * FROM products WHERE category = ?", [
    category,
  ]);
  return query;
};

exports.searchProduct = async (product) => {
  const query = await db.query(
    "SELECT * FROM products WHERE name LIKE ?",
    `%${product}%`
  );
  return query;
};

exports.addProduct = async (data) => {
  const query = await db.query("INSERT INTO products SET ?", [data]);
  return { id: query.insertId };
};
