// Importation des modules nécessaires
const router = require("express").Router(); // Création d'un routeur Express
const User = require("./models/User"); // Modèle Mongoose pour les utilisateurs
const users = require("./data/Users"); // Données d'exemple des utilisateurs à insérer
const Product = require("./models/Product"); // Modèle Mongoose pour les produits
const products = require("./data/Products"); // Données d'exemple des produits à insérer
const AsynHandler = require("express-async-handler"); // Middleware pour gérer les erreurs asynchrones

// **Route POST /users : Ajout des utilisateurs à la base de données**
router.post(
  "/users",
  AsynHandler(async (req, res) => {
    await User.deleteMany({}); // Supprime tous les utilisateurs existants dans la base de données avant l'insertion
    const UserSeeder = await User.insertMany(users); // Insère les utilisateurs à partir des données d'exemple
    res.send({ UserSeeder }); // Renvoie la réponse avec les utilisateurs insérés
  })
);

// **Route GET /products : Ajout des produits à la base de données**
router.get(
  "/products",
  AsynHandler(async (req, res) => {
    await Product.deleteMany({}); // Supprime tous les produits existants dans la base de données avant l'insertion
    const ProductSeeder = await Product.insertMany(products); // Insère les produits à partir des données d'exemple
    res.send({ ProductSeeder }); // Renvoie la réponse avec les produits insérés
  })
);

// Exportation du routeur pour l'utiliser dans d'autres parties de l'application
module.exports = router;
