"use client";  // Indique que ce fichier est un composant côté client dans Next.js

// Importation des composants nécessaires de 'flowbite-react' pour le menu déroulant
import { Dropdown } from "flowbite-react";
// Importation du composant Link de 'react-router-dom' pour la navigation entre les pages
import { Link } from "react-router-dom";

// Définition du composant UserDropdown qui prend 'logoutHandler' comme prop
export function UserDropdown({ logoutHandler }) {
  return (
    // Composant Dropdown de Flowbite pour afficher les options utilisateur
    <Dropdown label="User" dismissOnClick={false}>
      {/* Lien vers la page 'Historique des commandes'. Cela entoure l'élément du menu déroulant */}
      <Link to="/order-history">
        <Dropdown.Item>Order History</Dropdown.Item>
      </Link>
      {/* Élément du menu déroulant pour déconnecter l'utilisateur, en déclenchant la fonction logoutHandler passée en prop */}
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

