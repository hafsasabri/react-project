import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Import correct du middleware thunk
import storage from 'redux-persist/lib/storage';  // Stockage pour redux-persist
import { persistStore, persistReducer } from 'redux-persist';

// Importation de tous les reducers
import { productListReducer, productReducer } from './Reducers/Product';
import { userLoginReducer, userRegisterReducer } from './Reducers/User';
import { cartReducer } from './Reducers/Cart';
import { orderDetailReducer, orderListReducer, orderPaymentReducer, orderReducer } from './Reducers/Order';

// Configuration pour redux-persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1  // Important si vous souhaitez gérer des migrations de données dans le futur
};

// Combinaison de tous les reducers dans un seul rootReducer
const rootReducer = combineReducers({
    productListReducer,
    productReducer,
    userLoginReducer,
    userRegisterReducer,
    cartReducer,
    orderReducer,
    orderDetailReducer,
    orderPaymentReducer,
    orderListReducer
});

// Persistation du rootReducer avec la configuration de persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux avec le persistedReducer et application du middleware thunk pour gérer les actions asynchrones
export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)  // Application du middleware thunk
);

// Création du persistor pour gérer la persistance
export const persistor = persistStore(store);
