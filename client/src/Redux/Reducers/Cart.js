import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    CART_ITEM_CLEAR,
    CART_SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
} from "../Constants/Cart";

// Initialisation de l'état par défaut avec un tableau vide pour les articles du panier et un objet vide pour l'adresse de livraison.
export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} }, action
) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART:
            // Récupération de l'élément à ajouter au panier
            const item = action.payload;
            
            // Vérification si l'élément existe déjà dans le panier
            const existItem = state.cartItems.find((x) => x.product === item.product);
            
            // Si l'élément existe déjà, on met à jour sa quantité
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => {
                        return x.product === existItem.product ? item : x; // Remplacer l'élément existant
                    })
                };
            } else {
                // Sinon, on ajoute l'élément à la liste des articles du panier
                return {
                    ...state,
                    cartItems: [...state.cartItems, item] // Ajout de l'élément au panier
                };
            }

        case REMOVE_ITEM_FROM_CART:
            // Suppression de l'élément du panier en fonction de l'ID du produit
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            // Sauvegarde de l'adresse de livraison dans le state
            return { ...state, shippingAddress: action.payload };

        case SAVE_PAYMENT_METHOD:
            // Sauvegarde du mode de paiement dans le state
            return { ...state, paymentMethod: action.payload };

        case CART_ITEM_CLEAR:
            // Vider le panier
            return { ...state, cartItems: [] };

        default:
            // Retourner l'état inchangé si aucune action ne correspond
            return state;
    }
};
