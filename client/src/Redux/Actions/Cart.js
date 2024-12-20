import axios from "axios"; // Importation de axios pour effectuer des requêtes API
import {
    ADD_ITEM_TO_CART, // Type d'action pour ajouter un article au panier
    REMOVE_ITEM_FROM_CART, // Type d'action pour supprimer un article du panier
  
    CART_SAVE_SHIPPING_ADDRESS, // Type d'action pour enregistrer l'adresse de livraison
    SAVE_PAYMENT_METHOD // Type d'action pour enregistrer la méthode de paiement
} from "../Constants/Cart"; // Importation des types d'actions

import { BASE_URL } from "../Constants/BASE_URL"; // Importation de l'URL de base pour les appels API

// Action pour ajouter un article au panier
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try { 
        // Effectuer une requête pour obtenir les détails du produit par ID
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        
        // Dispatch de l'action pour ajouter l'article au panier avec les détails du produit et la quantité
        dispatch({
            type: ADD_ITEM_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });

        // Récupérer les articles du panier actuels depuis le state
        const cartItems = getState().cartReducer.cartItems;

        // Enregistrer les articles du panier dans localStorage afin de les garder après un rechargement de la page
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        console.log(error); // Afficher l'erreur dans la console s'il y en a
    }
}

// Action pour supprimer un article du panier
export const removeFromCartAction = (id) => (dispatch, getState) => {
    // Dispatch de l'action pour supprimer l'article en fonction de son ID
    dispatch({
        type: REMOVE_ITEM_FROM_CART,
        payload: id
    });

    // Enregistrer les articles du panier mis à jour dans localStorage après suppression
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

// Action pour enregistrer l'adresse de livraison dans le state et dans localStorage
export const saveShippingAddressAction = (data) => (dispatch) => {
    // Dispatch de l'action pour enregistrer l'adresse de livraison
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    });

    // Enregistrer l'adresse de livraison dans localStorage pour qu'elle soit persistante
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}

// Action pour enregistrer la méthode de paiement dans le state et dans localStorage
export const savePaymentMethodAction = (data) => (dispatch) => {
    // Dispatch de l'action pour enregistrer la méthode de paiement
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    });

    // Enregistrer la méthode de paiement dans localStorage
    localStorage.setItem("paymentMethod", JSON.stringify(data));
}
