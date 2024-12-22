// Importation des modules nécessaires
const express = require("express"); // Framework Express pour gérer les routes et les middlewares
const app = express(); // Initialisation de l'application Express
const PORT = process.env.PORT || 3000; // Récupère le port de l'application à partir des variables d'environnement
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require("mongoose"); // MongoDB pour gérer la base de données NoSQL
const dotenv = require("dotenv"); // Module pour gérer les variables d'environnement
dotenv.config(); // Charge les variables d'environnement définies dans le fichier .env
const routes = require('./routes');

// Connexion à la base de données MongoDB
mongoose
  .connect(process.env.MONGODB_URL) // Utilise l'URL de connexion MongoDB définie dans le fichier .env
  .then(() => console.log("db connected")) // Message de confirmation si la connexion réussit
  .catch((err) => console.log('DataBase Error : ', err)); // Gère l'erreur s'il y en a une, mais cela semble incorrect ici (probablement une faute de syntaxe)

app.use(morgan("combined"));

// support parsing of application/json type post data
app.use(bodyParser.json());

app.use('/api', routes);

// Lancement du serveur et écoute des requêtes HTTP sur le port spécifié
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`); // Message de confirmation du démarrage du serveur
});