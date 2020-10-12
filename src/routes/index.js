const indexController = require("../controllers/index");
const express = require("express");
const router = express.Router();

router.get("/", indexController.home);

module.exports = router;
