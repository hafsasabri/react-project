import axios from "axios";
import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_LIST_REQ_FAIL,

    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from "../Constants/Product"

import { BASE_URL } from "../Constants/BASE_URL"

// Action pour récupérer la liste des produits
export const productListAction = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQ }); // Déclenche l'action de demande de liste de produits
        const { data } = await axios.get(`${BASE_URL}/api/products`); // Envoie une requête GET pour récupérer les produits de l'API
        console.log(data); // Affiche les données récupérées pour débogage (à supprimer en production)
        dispatch({ type: PRODUCT_LIST_REQ_SUCCESS, payload: data }); // Action pour signaler que la liste des produits a été récupérée avec succès
    } catch (error) {
        // Gestion des erreurs : si une erreur survient, dispatch l'action de l'échec avec un message d'erreur
        dispatch({
            type: PRODUCT_LIST_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

// Action pour récupérer les détails d'un produit spécifique
export const productAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAIL_REQ }); // Déclenche l'action de demande de détails de produit
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`); // Envoie une requête GET pour récupérer les détails d'un produit spécifique
        dispatch({ type: PRODUCT_DETAIL_REQ_SUCCESS, payload: data }); // Action pour signaler que les détails du produit ont été récupérés avec succès
    } catch (error) {
        // Gestion des erreurs : si une erreur survient, dispatch l'action de l'échec avec un message d'erreur
        dispatch({
            type: PRODUCT_DETAIL_REQ_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}
