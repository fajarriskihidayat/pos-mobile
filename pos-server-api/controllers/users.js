const db = require("../configs/database");
const bcrypt = require("bcrypt");
const { passwordCheck } = require("../helpers/utils");

exports.fetchUser = async (username) => {
  const query = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  return query;
};

exports.addUser = async (req) => {
  const { name, username, password, role } = req;

  const encryptPwd = await bcrypt.hash(password, 10);

  const data = {
    name,
    username,
    password: encryptPwd,
    role,
  };

  // const user = await db.query("SELECT * FROM users WHERE username = ?", [
  //   username,
  // ]);
  // if (user) throw Error("User is already taken!");

  const query = await db.query("INSERT INTO users SET ?", [data]);
  return { id: query.insertId };
};

exports.editUser = async (req) => {
  const { name, username, password, newPassword } = req;

  const encryptPwd = await bcrypt.hash(newPassword, 10);

  const data = {
    name,
    username,
    password: encryptPwd,
  };

  const query = await db.query("UPDATE users SET ? WHERE username = ?", [
    data,
    username,
  ]);

  return { updated: query.affectedRows };
};

exports.loginUser = async (data) => {
  const userData = await db.query("SELECT * FROM users WHERE username = ?", [
    data.username,
  ]);
  if (userData.length === 0) throw new Error("user not found!");

  const check = await passwordCheck(data.username, data.password);
  if (check.compare === true) return check.userData;
  throw Error("wrong password!");
};
