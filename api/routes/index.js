// Importation des modules nécessaires
const express = require("express"); // Framework Express pour la gestion des routes et des requêtes HTTP
const routes = express.Router(); // Création d'un routeur pour l'API
const usersRoutes = require('./users.routes');
const productsRoutes = require('./products.routes');
const asyncHandler = require("express-async-handler");

routes
    .use('/users', usersRoutes)
    .use('/products', productsRoutes);

module.exports = routes;

