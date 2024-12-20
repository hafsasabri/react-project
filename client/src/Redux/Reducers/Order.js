import {
    ORDER_REQ,
    ORDER_RESET,
    ORDER_SUCCESS,
    ORDER_FAIL,

    ORDER_DETAIL_REQ,
    ORDER_DETAIL_REQ_FAIL,
    ORDER_DETAIL_REQ_SUCCESS,

    ORDER_PAYMENT_REQ,
    ORDER_PAYMENT_REQ_FAIL,
    ORDER_PAYMENT_REQ_SUCCESS,

    ORDER_LIST_REQ,
    ORDER_LIST_REQ_FAIL,
    ORDER_LIST_REQ_SUCCESS
} from "../Constants/Order";

// Reducer pour la création de commande
export const orderReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_REQ:
            // Lorsque la demande de commande est en cours, on passe l'état à "loading: true"
            return { loading: true };
        case ORDER_SUCCESS:
            // Lorsque la commande est créée avec succès, on met à jour l'état avec les détails de la commande
            return { loading: false, success: true, order: action.payload };
        case ORDER_FAIL:
            // Si la commande échoue, on enregistre l'erreur dans l'état
            return { loading: false, error: action.payload };
        case ORDER_RESET:
            // Réinitialisation de l'état de la commande (par exemple après un achat)
            return {};
        default:
            // Valeur par défaut de l'état
            return state;
    }
};

// Reducer pour les détails de la commande
export const orderDetailReducer = (state = { loading: true, shippingAddress: {}, orderItems: [] }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQ:
            // L'état devient "loading: true" lorsque la demande des détails de la commande est en cours
            return { loading: true };
        case ORDER_DETAIL_REQ_SUCCESS:
            // Si la demande des détails de la commande réussit, on enregistre les détails dans l'état
            return { loading: false, success: true, order: action.payload };
        case ORDER_DETAIL_REQ_FAIL:
            // Si l'erreur survient lors de la demande des détails de la commande, on enregistre l'erreur
            return { loading: false, error: action.payload };
        default:
            // Valeur par défaut de l'état
            return state;
    }
};

// Reducer pour le paiement de la commande
export const orderPaymentReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAYMENT_REQ:
            // Lorsque la demande de paiement est en cours, on passe l'état à "loading: true"
            return { loading: true };
        case ORDER_PAYMENT_REQ_SUCCESS:
            // Lorsque le paiement est réussi, on met à jour l'état
            return { loading: false, success: true, order: action.payload };
        case ORDER_PAYMENT_REQ_FAIL:
            // Si une erreur se produit pendant le paiement, on enregistre l'erreur
            return { loading: false, error: action.payload };
        default:
            // Valeur par défaut de l'état
            return state;
    }
};

// Reducer pour la liste des commandes
export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQ:
            // Lorsque la demande de la liste des commandes est en cours, on passe l'état à "loading: true"
            return { loading: true };
        case ORDER_LIST_REQ_SUCCESS:
            // Lorsque la demande des commandes réussit, on met à jour l'état avec la liste des commandes
            return { loading: false, success: true, orders: action.payload };
        case ORDER_LIST_REQ_FAIL:
            // Si une erreur survient lors de la demande des commandes, on enregistre l'erreur
            return { loading: false, error: action.payload };
        default:
            // Valeur par défaut de l'état
            return state;
    }
}
