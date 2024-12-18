// Importation de la bibliothèque jsonwebtoken pour la création et la validation des tokens JWT
const jwt = require('jsonwebtoken');

// Fonction pour générer un token JWT à partir de l'identifiant de l'utilisateur (id)
// Le token est signé avec une clé secrète et une durée d'expiration de 30 jours
const generateToekn = (id) => {
    // Création du token JWT
    return jwt.sign({ id }, process.env.JWT_SECRECT, { // Payload : l'ID de l'utilisateur, clé secrète et options
        expiresIn: "30d" // Durée d'expiration du token : 30 jours
    })
}

// Exportation de la fonction generateToekn pour qu'elle soit utilisée dans d'autres fichiers
module.exports = generateToekn;
