// Importation des modules nécessaires
const express = require("express"); // Framework Express pour les routes et requêtes HTTP
const userRoute = express.Router(); // Création d'un routeur spécifique pour les utilisateurs
const AsyncHandler = require("express-async-handler"); // Middleware pour gérer les erreurs dans les fonctions asynchrones
const User = require("../models/User"); // Modèle Mongoose pour les utilisateurs
const generateToekn = require("../tokenGenerate"); // Fonction pour générer un token JWT
const protect = require("../middleware/Auth"); // Middleware pour vérifier l'authentification de l'utilisateur

// Route POST /login : Authentification de l'utilisateur
userRoute.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body; // Récupération des données du corps de la requête
    const user = await User.findOne({ email }); // Recherche d'un utilisateur avec l'email fourni
    if (user && (await user.matchPassword(password))) {
      // Vérification de l'existence de l'utilisateur et de la correspondance du mot de passe
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToekn(user._id), // Génération d'un token JWT
        createdAt: user.createdAt,
      });
    } else {
      res.status(401); // Erreur 401 si les informations sont incorrectes
      throw new Error("Invalid Email or Password");
    }
  })
);

// **Route POST / : Inscription d'un nouvel utilisateur**
userRoute.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email }); // Vérifie si un utilisateur avec cet email existe déjà
    if (existUser) {
      res.status(400); // Erreur 400 si l'utilisateur existe déjà
      throw new Error("User Already Exist");
    } else {
      const user = await User.create({
        name,
        email,
        password, // Le mot de passe est automatiquement haché grâce au middleware `pre("save")` dans le modèle User
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400); // Erreur 400 si les données utilisateur sont invalides
        throw new Error("Invalid User Data");
      }
    }
  })
);

// Route GET /profile : Récupération des données du profil utilisateur (authentifié)
userRoute.get(
  "/profile",
  protect, // Middleware pour s'assurer que l'utilisateur est authentifié
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // Recherche de l'utilisateur par son ID
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404); // Erreur 404 si l'utilisateur n'est pas trouvé
      throw new Error("USER NOT FOUND");
    }
  })
);

// Route PUT /profile : Mise à jour des données du profil utilisateur (authentifié)
userRoute.put(
  "/profile",
  protect, // Middleware pour s'assurer que l'utilisateur est authentifié
  AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // Recherche de l'utilisateur par son ID
    if (user) {
      // Mise à jour des champs du profil
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password; // Mise à jour du mot de passe si fourni
      }
      const updatedUser = await user.save(); // Enregistrement des modifications dans la base de données
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToekn(updatedUser._id), // Renvoi d'un nouveau token JWT
      });
    } else {
      res.status(404); // Erreur 404 si l'utilisateur n'est pas trouvé
      throw new Error("USER NOT FOUND");
    }
  })
);

// Exportation du routeur pour être utilisé dans d'autres parties de l'application
module.exports = userRoute;
