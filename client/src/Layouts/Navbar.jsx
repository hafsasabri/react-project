import { useDispatch, useSelector } from "react-redux";  // Importation des hooks de Redux pour accéder à l'état global et dispatch des actions
import { UserDropdown } from "../components/Dropdown";  // Importation du composant UserDropdown pour afficher les options utilisateur
import { Link } from "react-router-dom";  // Importation de Link pour la navigation côté client sans recharger la page
import { userLogoutAction } from "../Redux/Actions/User";  // Importation de l'action de déconnexion utilisateur

import Checkout from "../pages/Checkout";  // Importation du composant Checkout pour afficher le panier
import { useState } from "react";  // Importation du hook useState pour gérer l'état local du composant

const Navbar = () => {
  // Sélection de l'état global pour obtenir les informations de l'utilisateur connecté
  const userLoginReducer = useSelector((state) => state.userLoginReducer);
  const { userInfo } = userLoginReducer;

  // Utilisation de dispatch pour envoyer des actions à Redux
  const dispatch = useDispatch();

  // Calcul du nombre total d'articles dans le panier en accumulant les quantités des éléments
  const qty = useSelector((state) => state.cartReducer.cartItems.reduce((total, item) => total + item.qty, 0));

  // Fonction pour gérer la déconnexion de l'utilisateur en envoyant une action de déconnexion
  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };

  // Hook useState pour contrôler l'état d'ouverture du panier (Checkout)
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">  {/* Conteneur principal du Navbar */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo et titre du site avec lien vers la page d'accueil */}
          <Link to="/" className="flex items-center">
            <img
              src="https://www.svgrepo.com/show/520948/shopping-bag-4.svg"
              className="h-8 mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Node Shop.
            </span>
          </Link>

          <div className="flex md:order-2">
            {/* Si l'utilisateur n'est pas connecté, afficher le bouton d'inscription */}
            {!userInfo ? (
              <Link
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </Link>
            ) : (
              <>
                {/* Si l'utilisateur est connecté, afficher le menu déroulant pour l'utilisateur */}
                <UserDropdown logoutHandler={logoutHandler}></UserDropdown>

                {/* Bouton pour ouvrir le panier (Checkout) */}
                <button
                  data-collapse-toggle="navbar-cta"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-cta"
                  aria-expanded="false"
                  onClick={() => setOpen(true)}  // Ouvrir le panier (Checkout) lorsque le bouton est cliqué 
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <span>{qty}</span>  {/* Affichage du nombre d'articles dans le panier */}
                </button>

                {/* Affichage du composant Checkout (panier) */}
                <Checkout open={open} setOpen={setOpen}></Checkout>
              </>
            )}
            {/* Bouton pour ouvrir un menu mobile (non visible sur des écrans plus grands) */}
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Menu de navigation principal, caché en mobile et affiché en desktop */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
// Exportation du composant Navbar pour l'utiliser ailleurs dans l'application
export default Navbar;
