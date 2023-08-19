const bcrypt = require("bcrypt");
const db = require("../configs/database");

exports.randomOrderNumber = () => {
  const prefix = "T",
    randomNumber = Math.floor(Math.random() * 1000);
  return prefix + randomNumber;
};

exports.passwordCheck = async (username, password) => {
  const userData = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  const compare = await bcrypt.compare(password, userData[0].password);
  return { userData, compare };
};
