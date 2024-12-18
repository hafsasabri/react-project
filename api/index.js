// Importation des modules nécessaires
const express = require("express"); // Framework Express pour gérer les routes et les middlewares
const app = express(); // Initialisation de l'application Express
const dotenv = require("dotenv"); // Module pour gérer les variables d'environnement
const products = require("./data/Products"); // Fichier contenant des données de produits
dotenv.config(); // Charge les variables d'environnement définies dans le fichier .env
const PORT = process.env.PORT; // Récupère le port de l'application à partir des variables d'environnement
const cors = require("cors"); // Middleware pour gérer les requêtes cross-origin (CORS)
const mongoose = require("mongoose"); // MongoDB pour gérer la base de données NoSQL

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGOOSEDB_RUL) // Utilise l'URL de connexion MongoDB définie dans le fichier .env
  .then(() => console.log("db connected")) // Message de confirmation si la connexion réussit
  .then((err) => { err }); // Gère l'erreur s'il y en a une, mais cela semble incorrect ici (probablement une faute de syntaxe)

// Importation des routes de l'application
const databaseSeeder = require("./databaseSeeder"); // Seeder pour insérer des données de test dans la base de données
const userRoute = require("./routes/User"); // Routes pour la gestion des utilisateurs
const productRoute = require("./routes/Product"); // Routes pour la gestion des produits
const orderRoute = require("./routes/Order"); // Routes pour la gestion des commandes

// Middleware pour parser les données JSON envoyées par le client
app.use(express.json());

// Middleware pour gérer les requêtes CORS, permettant de contrôler l'accès entre serveurs
app.use(cors());

// Définition des routes de l'application
// Route pour la gestion du seeding de la base de données (ajout de données fictives)
app.use("/api/seed", databaseSeeder);

// Routes pour les utilisateurs
app.use("/api/users", userRoute);

// Routes pour les produits
app.use("/api/products", productRoute);

// Routes pour les commandes
app.use("/api/orders", orderRoute);

// Route pour récupérer l'ID client de PayPal (utilisée pour la configuration du paiement)
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID); // Envoie l'ID client PayPal depuis les variables d'environnement
});

// Lancement du serveur et écoute des requêtes HTTP sur le port spécifié
app.listen(PORT || 9000, () => {
  console.log(`server listening on port ${PORT}`); // Message de confirmation du démarrage du serveur
});

// api product test route
app.get("/api/products", (req, res) => {
  res.json(products);
 });
app.get("/api/products/:id", (req, res) => {
    const product = products.find((product)=>product.id === req.params.id)
   res.json(product);
 });
