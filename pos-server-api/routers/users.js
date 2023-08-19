const express = require("express");
const response = require("../helpers/response");
const users = express.Router();

const {
  addUser,
  fetchUser,
  loginUser,
  editUser,
} = require("../controllers/users");

users.route("/:username").get(async (req, res) => {
  try {
    const result = await fetchUser(req.params.username);
    response.success(result, "user fetched!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

users.route("/").post(async (req, res) => {
  try {
    const result = await addUser(req.body);
    response.success(result, "User created!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

users.route("/").put(async (req, res) => {
  try {
    const result = await editUser(req.body);
    response.success(result, "user updated!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

users.route("/login").post(async (req, res) => {
  try {
    const result = await loginUser(req.body);
    response.success(result[0], "Login success!", res);
  } catch (err) {
    response.error({ error: err.message }, req.originalUrl, 403, res);
  }
});

module.exports = users;
