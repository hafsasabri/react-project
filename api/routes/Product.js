// Importation des modules nécessaires
const express = require("express"); // Framework Express pour la gestion des routes et des requêtes HTTP
const productRoute = express.Router(); // Création d'un routeur pour les produits
const asyncHandler = require("express-async-handler"); // Middleware pour gérer les erreurs dans les fonctions asynchrones
const Product = require("../models/Product"); // Modèle Mongoose pour les produits

// Route pour récupérer la liste de tous les produits
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    // Recherche de tous les produits dans la base de données
    const products = await Product.find({});
    res.json(products); // Envoie la liste des produits en réponse
  })
);

// Route pour récupérer les détails d'un produit spécifique par son ID
productRoute.get(
  "/:id", // Endpoint avec un paramètre dynamique `id`
  asyncHandler(async (req, res) => {
    // Recherche d'un produit par son ID
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product); // Si le produit est trouvé, retourne ses détails
    } else {
      res.status(404); // Erreur 404 : Produit non trouvé
      throw new Error("Product not found"); // Lance une erreur personnalisée
    }
  })
);

// Exportation du routeur pour être utilisé dans d'autres parties de l'application
module.exports = productRoute;
