// commandes.router.js

const express = require("express");
const commandesController = require("../controllers/commandes.controllers");
var router = express.Router();

router.get("/", commandesController.getCommandes);

module.exports = router;