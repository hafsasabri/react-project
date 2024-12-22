// Importation des modules nécessaires
const express = require("express"); // Framework Express pour la gestion des routes et des requêtes HTTP
const routes = express.Router(); // Création d'un routeur pour les produits
const controller = require('../controllers/products.controller');
const asyncHandler = require("express-async-handler");
const authenticated = require("../middlewares/auth.middleware");

routes
    .get('/', authenticated, asyncHandler(controller.getProducts));

module.exports = routes;