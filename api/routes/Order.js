// Importation des modules nécessaires
const express = require("express"); // Framework pour construire des routes et gérer des requêtes HTTP
const orderRoute = express.Router(); // Création d'un routeur pour les commandes
const protect = require("../middleware/Auth"); // Middleware pour protéger les routes (authentification requise)
const asyncHandler = require("express-async-handler"); // Gestion des erreurs dans les fonctions asynchrones
const Order = require("../models/Order"); // Modèle Mongoose pour les commandes

// Route pour créer une nouvelle commande
orderRoute.post(
  "/",
  protect, // Middleware pour s'assurer que l'utilisateur est authentifié
  asyncHandler(async (req, res) => {
    // Extraction des informations de la commande depuis le corps de la requête
    const {
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
      price,
    } = req.body;

    console.log(orderItems); // Débogage pour voir les articles de la commande

    // Vérifie si la commande contient des articles
    if (orderItems && orderItems.length === 0) {
      res.status(400); // Erreur 400 : Mauvaise requête
      throw new Error("No order items found");
    } else {
      // Création d'une nouvelle commande
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethods,
        shippingPrice,
        taxPrice,
        totalPrice,
        price,
        user: req.user._id, // Associe la commande à l'utilisateur connecté
      });

      // Enregistre la commande dans la base de données
      const createdOrder = await order.save();
      res.status(201).json(createdOrder); // Réponse avec le statut 201 (créé) et les détails de la commande
    }
  })
);

// Route pour récupérer les détails d'une commande par son ID
orderRoute.get(
  "/:id",
  protect, // Middleware pour s'assurer que l'utilisateur est authentifié
  asyncHandler(async (req, res) => {
    // Recherche de la commande par ID et récupération des informations utilisateur associées
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email" // Inclut les champs `name` et `email` de l'utilisateur
    );

    if (order) {
      res.status(200).json(order); // Réponse avec les détails de la commande
    } else {
      res.status(404); // Erreur 404 : Ressource non trouvée
      throw new Error("Order Not Found");
    }
  })
);

// Route pour mettre à jour le statut de paiement d'une commande
orderRoute.put(
  "/:id/payment",
  protect, // Middleware pour protéger la route
  asyncHandler(async (req, res) => {
    // Recherche de la commande par ID
    const order = await Order.findById(req.params.id);
    if (order) {
      // Mise à jour des informations de paiement
      order.isPaid = true;
      order.paidAt = Date.now(); // Enregistre la date de paiement
      order.paymentResult = {
        id: req.body.id, // ID de la transaction
        status: req.body.status, // Statut du paiement
        update_time: req.body.create_time, // Heure de mise à jour
        email_address: req.body.payer.email_address, // Adresse email du payeur
      };

      const updatedOrder = order.save(); // Sauvegarde la commande mise à jour

      res.status(200).json(updatedOrder); // Réponse avec la commande mise à jour
    } else {
      res.status(404); // Erreur 404 : Ressource non trouvée
      throw new Error("Order Not Found");
    }
  })
);

// Route pour récupérer la liste des commandes de l'utilisateur connecté
orderRoute.get(
  "/",
  protect, // Middleware pour protéger la route
  asyncHandler(async (req, res) => {
    // Recherche des commandes associées à l'utilisateur connecté, triées par ID décroissant
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders) {
      res.status(200).json(orders); // Réponse avec la liste des commandes
    } else {
      res.status(404); // Erreur 404 : Ressource non trouvée
      throw new Error("Orders Not Found");
    }
  })
);

// TODO : Intégration du paiement via Stripe (non implémenté pour l'instant)

// Exportation du routeur pour être utilisé dans d'autres parties de l'application
module.exports = orderRoute;
