import axios from "axios";
import {
    ORDER_REQ,
    ORDER_SUCCESS,

    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,

    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,

    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS
} from "../Constants/Order"
import { BASE_URL } from "../Constants/BASE_URL";

import { CART_ITEM_CLEAR } from "../Constants/Cart"
import { userLogoutAction } from "./User";

// Action de commande (Création de commande)
export const orderAction = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_REQ }) // Déclenche l'action de demande de commande
        const userInfo = getState().userLoginReducer.userInfo; // Récupère les infos de l'utilisateur connecté depuis Redux
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`, // Envoie le token d'authentification de l'utilisateur dans les headers
            }
        }
        const { data } = await axios.post(
            `${BASE_URL}/api/orders`, // Envoie une requête POST pour créer une commande
            order, // Corps de la requête : les données de la commande
            config // Config d'authentification
        );
        
        dispatch({ type: ORDER_SUCCESS, payload: data }); // Action pour signaler que la commande a été créée avec succès
        dispatch({ type: CART_ITEM_CLEAR, payload: data }); // Efface les articles du panier après la commande
    } catch (error) {
        console.log(error); // Gestion des erreurs (à personnaliser)
    }
}

// Action de paiement de commande
export const orderPaymentAction = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAYMENT_REQ }); // Déclenche l'action de demande de paiement
        const userInfo = getState().userLoginReducer.userInfo; // Récupère les infos de l'utilisateur connecté
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`, // Envoie le token d'authentification
            },
        };
        const { data } = await axios.put(
            `${BASE_URL}/api/orders/${orderId}/payment`, // Envoie une requête PUT pour traiter le paiement d'une commande
            paymentResult, // Résultat du paiement
            config // Config d'authentification
        );

        dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data }); // Action pour signaler que le paiement a réussi
        dispatch(orderDetailAction(orderId)); // Récupère les détails de la commande après paiement
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") { // Si l'utilisateur n'est pas autorisé (token expiré ou autre)
            dispatch(userLogoutAction()); // Déconnecte l'utilisateur
        }
        dispatch({
            type: ORDER_PAYMENT_REQ_FAIL, // Envoie l'action d'échec du paiement
            payload: message, // Charge le message d'erreur
        });
    }
};

// Action pour récupérer les détails d'une commande
export const orderDetailAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQ }); // Déclenche l'action de demande de détails de la commande
        const userInfo = getState().userLoginReducer.userInfo; // Récupère les infos de l'utilisateur connecté
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`, // Envoie le token d'authentification
            },
        };
        const { data } = await axios.get(
            `${BASE_URL}/api/orders/${id}`, // Envoie une requête GET pour récupérer les détails d'une commande
            config // Config d'authentification
        );
        dispatch({ type: ORDER_DETAIL_REQ_SUCCESS, payload: data }); // Action pour signaler que les détails de la commande ont été récupérés avec succès
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") { // Si l'utilisateur n'est pas autorisé
            dispatch(userLogoutAction()); // Déconnecte l'utilisateur
        }
        dispatch({
            type: ORDER_DETAIL_REQ_FAIL, // Envoie l'action d'échec pour la récupération des détails
            payload: message, // Charge le message d'erreur
        });
    }
};

// Action pour récupérer la liste des commandes
export const orderListAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQ }); // Déclenche l'action de demande de liste des commandes
        const userInfo = getState().userLoginReducer.userInfo; // Récupère les infos de l'utilisateur connecté

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`, // Envoie le token d'authentification
            },
        };
        const { data } = await axios.get(
            `${BASE_URL}/api/orders`, // Envoie une requête GET pour récupérer la liste des commandes
            config // Config d'authentification
        );
        dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data }); // Action pour signaler que la liste des commandes a été récupérée avec succès
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        if (message === "Not authorized!") { // Si l'utilisateur n'est pas autorisé
            dispatch(userLogoutAction()); // Déconnecte l'utilisateur
        }
        dispatch({
            type: ORDER_LIST_REQ_FAIL, // Envoie l'action d'échec pour récupérer la liste des commandes
            payload: message, // Charge le message d'erreur
        });
    }
};
