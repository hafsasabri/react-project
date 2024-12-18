const mongoose = require("mongoose");

// Définition du schéma pour les avis sur les produits
const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom de l'utilisateur ayant laissé l'avis
  rating: { type: Number, required: true }, // Note attribuée au produit
  comment: { type: String, required: true }, // Commentaire sur le produit
  user: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'utilisateur ayant laissé l'avis
    required: true,
    ref: "User",
  },
});

// Définition du schéma principal pour les produits
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom du produit
  image: { type: String, required: true }, // URL de l'image du produit
  description: { type: String, required: true }, // Description détaillée du produit
  rating: {
    type: Number,
    required: true,
    default: 0, // Note moyenne du produit (par défaut 0)
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0, // Nombre d'avis sur le produit (par défaut 0)
  },
  price: {
    type: Number,
    required: true,
    default: 0, // Prix du produit (par défaut 0)
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0, // Nombre d'unités disponibles en stock (par défaut 0)
  },
  reviews: [reviewSchema], // Tableau d'avis basé sur le sous-schéma reviewSchema
});

// Exportation du modèle basé sur le schéma principal
module.exports = mongoose.model("Product", productSchema);
