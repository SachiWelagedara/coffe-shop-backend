const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;
