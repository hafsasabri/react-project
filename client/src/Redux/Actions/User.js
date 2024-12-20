import axios from "axios";
import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_FAIL,
    USER_LOGIN_REQ_SUCCESS,

    USER_LOGOUT,
    USER_REGISTER_REQ,
    USER_REGISTER_REQ_FAIL,
    USER_REGISTER_REQ_SUCCESS,
} from "../Constants/User";

import { BASE_URL } from "../Constants/BASE_URL";

// Action pour la connexion d'un utilisateur
export const userLoginAction = (email, password) => async (dispatch) => {
    try {
        // Déclenche une action de demande de connexion
        dispatch({ type: USER_LOGIN_REQ });
        
        const config = {
            headers: {
                "Content-Type": "application/json", // Indique que le corps de la requête est en JSON
            }
        };
        
        // Envoie une requête POST avec les informations d'authentification de l'utilisateur
        const { data } = await axios.post(`${BASE_URL}/api/users/login`, { email, password }, config);
        
        // Si la connexion est réussie, déclenche l'action de succès avec les données utilisateur
        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        
        // Sauvegarde les informations de l'utilisateur dans le localStorage pour les garder entre les rechargements de page
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // En cas d'erreur, déclenche l'action de échec avec le message d'erreur reçu
        dispatch({
            type: USER_LOGIN_REQ_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Action pour la déconnexion d'un utilisateur
export const userLogoutAction = () => async (dispatch) => {
    // Retire les informations de l'utilisateur du localStorage pour le déconnecter
    localStorage.removeItem("userInfo");
    
    // Déclenche l'action de déconnexion
    dispatch({ type: USER_LOGOUT });
    
    // Redirige l'utilisateur vers la page de connexion
    document.location.href = "/login";
};

// Action pour l'enregistrement (inscription) d'un utilisateur
export const userRegisterAction = (name, email, password) => async (dispatch) => {
    try {
        // Déclenche une action de demande d'enregistrement
        dispatch({ type: USER_REGISTER_REQ });
        
        const config = {
            headers: {
                "Content-Type": "application/json", // Indique que le corps de la requête est en JSON
            }
        };
        
        // Envoie une requête POST avec les informations d'inscription de l'utilisateur
        const { data } = await axios.post(`${BASE_URL}/api/users`, { name, email, password }, config);
        
        // Si l'inscription est réussie, déclenche l'action de succès avec les données utilisateur
        dispatch({ type: USER_REGISTER_REQ_SUCCESS, payload: data });
        
        // Déclenche également l'action de connexion avec les mêmes données utilisateur (inscription et connexion simultanées)
        dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
        
        // Sauvegarde les informations de l'utilisateur dans le localStorage pour garder l'utilisateur connecté
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // En cas d'erreur, déclenche l'action de échec avec le message d'erreur reçu
        dispatch({
            type: USER_REGISTER_REQ_FAIL,
            payload: error.response.data.message,
        });
    }
};
