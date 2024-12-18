// Importation de bcryptjs pour le hachage des mots de passe
const bcrypt = require("bcryptjs");
// Définition de la liste des utilisateurs avec des informations d'identification
const users = [
 // Administrateur avec des droits spéciaux (isAdmin: true)
  {
    name: "Admin",
    email: "admin@node.com",
    password: bcrypt.hashSync("123456", 10), // Hachage du mot de passe pour des raisons de sécurité
    isAdmin: true,
  },
// Utilisateur standard avec des droits normaux
  {
    name: "User",
    email: "user@node.com",
    password: bcrypt.hashSync("123456", 10), // Hachage du mot de passe
  },
];
// Exportation de la liste des utilisateurs pour une utilisation dans d'autres modules
module.exports = users;