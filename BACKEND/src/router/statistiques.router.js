// statistiques.router.js

const express = require("express");
const userController = require("../controllers/statistiques.controllers");
var router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello, this is the statistiques router!");
});
router.get("/venteBilletParDate", userController.getVenteBilletParDate);
router.get("/venteBilletParType", userController.getVenteBilletParType);
router.get("/venteArticle", userController.getVenteArticle);
router.get("/venteArticle/:id", userController.getVenteArticle);
router.get("/venteParCatetorie", userController.getVenteParCategorie);

router.post("/addConnexionToday", userController.addConnexionToday);
router.get("/getConnextionToday", userController.getConnextionToday);

module.exports = router;