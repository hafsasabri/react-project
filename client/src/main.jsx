import ReactDOM from "react-dom/client";
import "./index.css"; // Styles globaux
import App from './App'; // Composant principal de l'application
import {store, persistor} from "./Redux/store"; // Importation du store et persistor
import { Provider } from "react-redux"; // Fournisseur Redux
import { PersistGate } from "redux-persist/integration/react"; // Gestion de la persistance de l'état

// Rendu de l'application dans l'élément HTML avec l'id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}> {/* Connexion de Redux à l'application */}
    <PersistGate loading={null} persistor={persistor}> {/* Gestion de la persistance */}
      <App /> {/* L'application elle-même */}
    </PersistGate>
  </Provider>
);
