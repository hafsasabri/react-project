// Actions pour la gestion des commandes
export const ORDER_REQ = "ORDER_REQ"; // Demande de commande
export const ORDER_RESET = "ORDER_RESET"; // Réinitialiser la commande
export const ORDER_SUCCESS = "ORDER_SUCCESS"; // Commande réussie
export const ORDER_FAIL = "ORDER_FAIL"; // Commande échouée

// Actions pour la gestion du paiement de la commande
export const ORDER_PAYMENT_REQ = "ORDER_PAYMENT_REQ"; // Demande de paiement
export const ORDER_PAYMENT_REQ_FAIL = "ORDER_PAYMENT_REQ_FAIL"; // Échec du paiement
export const ORDER_PAYMENT_REQ_SUCCESS = "ORDER_PAYMENT_REQ_SUCCESS"; // Paiement réussi

// Actions pour la gestion des détails de la commande
export const ORDER_DETAIL_REQ = "ORDER_DETAIL_REQ"; // Demande des détails de la commande
export const ORDER_DETAIL_REQ_FAIL = "ORDER_DETAIL_REQ_FAIL"; // Échec de la demande de détails de la commande
export const ORDER_DETAIL_REQ_SUCCESS = "ORDER_DETAIL_REQ_SUCCESS"; // Détails de la commande récupérés avec succès

// Actions pour la gestion de la liste des commandes
export const ORDER_LIST_REQ = "ORDER_LIST_REQ"; // Demande de la liste des commandes
export const ORDER_LIST_REQ_FAIL = "ORDER_LIST_REQ_FAIL"; // Échec de la demande de la liste des commandes
export const ORDER_LIST_REQ_SUCCESS = "ORDER_LIST_REQ_SUCCESS"; // Liste des commandes récupérée avec succès
