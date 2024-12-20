import {
    PRODUCT_LIST_REQ,
    PRODUCT_LIST_REQ_SUCCESS,
    PRODUCT_LIST_REQ_FAIL,

    PRODUCT_DETAIL_REQ,
    PRODUCT_DETAIL_REQ_SUCCESS,
    PRODUCT_DETAIL_REQ_FAIL
} from "../Constants/Product";

// Reducer pour la liste des produits
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQ:
            // Lorsque la demande de liste de produits est en cours, on passe l'état à "loading: true" et on vide la liste des produits
            return {
                loading: true, 
                products: [], 
            };
        case PRODUCT_LIST_REQ_SUCCESS:
            // Lorsque la demande des produits réussit, on met à jour l'état avec les produits, ainsi que les informations de pagination (totalPage et page)
            return {
                loading: false, 
                products: action.payload, 
                totalPage: action.payload.totalPage, 
                page: action.payload.page
            };
        case PRODUCT_LIST_REQ_FAIL:
            // Si l'erreur survient lors de la demande des produits, on enregistre l'erreur
            return { 
                loading: false, 
                error: action.payload.error 
            };
        default:
            return state;
    }
};

// Reducer pour un produit individuel (détails du produit par ID)
export const productReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQ:
            // Lorsque la demande pour les détails d'un produit est en cours, on passe l'état à "loading: true"
            return {
                loading: true, 
                ...state
            };
        case PRODUCT_DETAIL_REQ_SUCCESS:
            // Lorsque la demande pour les détails du produit réussit, on met à jour l'état avec les données du produit
            return {
                loading: false, 
                product: action.payload
            };
        case PRODUCT_DETAIL_REQ_FAIL:
            // Si l'erreur survient lors de la demande des détails du produit, on enregistre l'erreur
            return { 
                loading: false, 
                error: action.payload 
            };
        default:
            return state;
    }
}
