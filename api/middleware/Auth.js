// Importation des dépendances nécessaires
const jwt = require("jsonwebtoken"); // Pour la gestion et la vérification des tokens JWT
const asyncHandler = require("express-async-handler"); // Pour simplifier la gestion des erreurs dans les fonctions async
const User = require("../models/User"); // Modèle utilisateur pour accéder à la base de données

// Middleware pour protéger les routes nécessitant une authentification
const protect = asyncHandler(async (req, res, next) => {
  let token; // Variable pour stocker le token JWT extrait de la requête

  // Vérifie si l'en-tête "Authorization" est présent et commence par "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extraction du token JWT de l'en-tête "Authorization"
      token = req.headers.authorization.split(" ")[1];

      // Décodage et vérification du token à l'aide de la clé secrète
      const decodedToken = jwt.verify(token, process.env.JWT_SECRECT);

      // Recherche de l'utilisateur correspondant à l'ID extrait du token
      // La sélection exclut le champ "password" pour des raisons de sécurité
      req.user = await User.findById(decodedToken.id).select("-password");

      // Passe au middleware suivant si tout est valide
      next();
    } catch (err) {
      // Gestion des erreurs en cas d'échec de la vérification du token
      console.log(err);
      res.status(401); // Code de statut 401 pour "Non autorisé"
      throw new Error("Token invalid or not authorized!");
    }
  }

  // Si aucun token n'est fourni, renvoyer une erreur
  if (!token) {
    res.status(401); // Code de statut 401 pour "Non autorisé"
    throw new Error("Not authorized ..!");
  }
});

// Exportation du middleware pour l'utiliser dans d'autres fichiers
module.exports = protect;
