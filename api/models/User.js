// Importation des modules nécessaires
const mongoose = require("mongoose"); // Mongoose est utilisé pour interagir avec MongoDB
const bcrypt = require("bcryptjs"); // bcryptjs est utilisé pour hacher les mots de passe

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema(
  {
    // Nom de l'utilisateur (obligatoire)
    name: { type: String, required: true },
    
    // Adresse email de l'utilisateur (obligatoire et unique)
    email: { type: String, required: true, unique: true },
    
    // Mot de passe de l'utilisateur (obligatoire)
    password: { type: String, required: true },
    
    // Indicateur si l'utilisateur est un administrateur
    isAdmin: {
      type: Boolean, // Type booléen
      default: false, // Par défaut, un utilisateur n'est pas administrateur
    },
  },
  // Options supplémentaires du schéma
  { 
    timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
  }
);

// Méthode pour valider si un mot de passe fourni correspond au mot de passe enregistré
userSchema.methods.matchPassword = async function (enterPassword) {
  // Compare le mot de passe entré par l'utilisateur avec le mot de passe enregistré
  return await bcrypt.compare(enterPassword, this.password);
};

// Middleware qui hache le mot de passe avant de sauvegarder un utilisateur
userSchema.pre("save", async function (next) {
  // Si le mot de passe n'a pas été modifié, passe à l'étape suivante
  if (!this.isModified("password")) {
    next();
  }
  // Génère un sel pour le hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  // Hache le mot de passe en utilisant le sel généré
  this.password = await bcrypt.hash(this.password, salt);
});

// Exporte le modèle utilisateur basé sur le schéma
module.exports = mongoose.model("User", userSchema);
