// Importation de la bibliothèque mongoose pour la gestion des bases de données MongoDB
const mongoose = require("mongoose");

// Définition du sous-schéma pour les articles de commande
const orderItemSchema = mongoose.Schema({
  name: { type: String, required: true }, // Nom du produit
  qty: { type: Number, required: true }, // Quantité commandée
  image: { type: String, required: true }, // URL de l'image du produit
  price: { type: Number, required: true }, // Prix unitaire du produit
  product: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'ID du produit dans la collection "Product"
    ref: "Product",
    required: true,
  },
});

// Définition du schéma principal pour les commandes
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur dans la collection "User"
      required: true,
      ref: "User",
    },
    orderItems: [orderItemSchema], // Tableau d'articles de commande basé sur le sous-schéma défini ci-dessus
    shippingAddress: {
      address: { type: String, required: true }, // Adresse de livraison
      city: { type: String, required: true }, // Ville de livraison
      postalCode: { type: String, required: true }, // Code postal
      country: { type: String, required: true }, // Pays
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal", // Méthode de paiement par défaut
    },
    paymentResult: {
      id: { type: String }, // ID de la transaction de paiement
      status: { type: String }, // Statut de la transaction (par ex. "Success", "Failed")
      updated_time: { type: String }, // Date et heure de la mise à jour du paiement
      email_address: { type: String }, // Email associé au paiement
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0, // Prix des taxes par défaut
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0, // Prix de livraison par défaut
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0, // Prix total par défaut
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false, // Indique si la commande a été payée
    },
    paidAt: {
      type: Date, // Date de paiement
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false, // Indique si la commande a été livrée
    },
    deliveredAt: {
      type: Date, // Date de livraison
    },
  },
  {
    timestamps: true, // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

// Exportation du modèle basé sur le schéma principal
module.exports = mongoose.model("Order", orderSchema);
