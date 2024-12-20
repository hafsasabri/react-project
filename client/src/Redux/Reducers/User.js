import {
    USER_LOGIN_REQ,
    USER_LOGIN_REQ_SUCCESS,
    USER_LOGIN_REQ_FAIL,
    USER_LOGOUT,

    USER_REGISTER_REQ,
    USER_REGISTER_REQ_SUCCESS,
    USER_REGISTER_REQ_FAIL
} from "../Constants/User";

// Reducer pour la connexion de l'utilisateur
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQ:
            // Lorsque la demande de connexion est en cours, on passe l'état à "loading: true"
            return { loading: true };
        case USER_LOGIN_REQ_SUCCESS:
            // Lorsque la connexion réussit, on met à jour l'état avec les informations de l'utilisateur
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_REQ_FAIL:
            // Si la connexion échoue, on enregistre l'erreur dans l'état
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            // Lorsque l'utilisateur se déconnecte, on réinitialise l'état (on vide les données de l'utilisateur)
            return {};
        default:
            return state;
    }
};

// Reducer pour l'enregistrement de l'utilisateur
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQ:
            // Lorsque la demande d'enregistrement est en cours, on passe l'état à "loading: true"
            return { loading: true };
        case USER_REGISTER_REQ_SUCCESS:
            // Lorsque l'enregistrement réussit, on met à jour l'état avec les informations de l'utilisateur
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_REQ_FAIL:
            // Si l'enregistrement échoue, on enregistre l'erreur dans l'état
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            // Lorsque l'utilisateur se déconnecte, on réinitialise l'état
            return {};
        default:
            return state;
    }
};
