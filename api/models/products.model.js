const mongoose = require("mongoose");

// Définition du schéma principal pour les produits
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom du produit
  image: { type: String, required: true }, // URL de l'image du produit
  description: { type: String, required: true }, // Description détaillée du produit
  price: {
    type: Number,
    required: true,
    default: 0, // Prix du produit (par défaut 0)
  }
});

// Exportation du modèle basé sur le schéma principal
module.exports = mongoose.model("Product", productSchema);
