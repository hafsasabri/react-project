"use client"; // Directive indiquant que ce composant est spécifique au côté client, utilisé dans Next.js

import { useState } from "react"; // Importation de useState pour gérer l'état local si nécessaire
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"; // Importation des composants nécessaires pour créer un panneau de dialogue (overlay)
import { XMarkIcon } from "@heroicons/react/24/outline"; // Importation de l'icône de fermeture (X)
import { useSelector } from "react-redux"; // Utilisation de useSelector pour accéder à l'état global du store Redux
import { Link } from "react-router-dom"; // Importation de Link pour la navigation entre les pages
import CartItem from "../components/CartItem"; // Importation du composant CartItem pour afficher les articles du panier

export default function Checkout({ open, setOpen }) {
  // Récupération des articles du panier depuis l'état global (Redux)
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems } = cart; // Extraction des éléments du panier depuis l'état

  // Calcul du total du panier en fonction de la quantité et du prix des articles, et formatage en 2 décimales
  const total = cartItems.reduce((total, item) => total + item.qty * item.price, 0).toFixed(2);

  return (
    <Dialog
      open={open} // Le panneau de dialogue est contrôlé par l'état "open"
      onClose={() => setOpen(false)} // Fermeture du panneau en appelant setOpen(false)
      className="relative z-10"
    >
      {/* Arrière-plan semi-transparent qui s'affiche derrière le panneau de dialogue */}
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Positionnement du panneau sur la droite de l'écran */}
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart {/* Titre du panneau */}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      {/* Bouton de fermeture du panneau */}
                      <button
                        type="button"
                        onClick={() => setOpen(false)} // Ferme le panneau lorsque cliqué
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span> {/* Texte accessible pour l'élément fermé */}
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" /> {/* Icône de fermeture */}
                      </button>
                    </div>
                  </div>
                  {/* Affichage des articles du panier dans un composant CartItem */}
                  <CartItem cartItems={cartItems} />
                </div>

                {/* Section du bas avec le sous-total et les options de paiement */}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p> {/* Affiche le texte "Subtotal" */}
                    <p>${total}</p> {/* Affiche le total du panier */}
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout. {/* Informations sur les frais supplémentaires */}
                  </p>
                  <div className="mt-6">
                    {/* Lien pour procéder au paiement vers la page "/placeorder" */}
                    <Link
                      to="/placeorder"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout {/* Bouton de validation pour le passage à la caisse */}
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      {/* Bouton permettant de fermer le panneau et continuer les achats */}
                      <button
                        type="button"
                        onClick={() => setOpen(false)} // Ferme le panneau et permet de revenir à la page précédente
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping {/* Texte sur le bouton */}
                        <span aria-hidden="true"> &rarr;</span> {/* Flèche pour symboliser la continuation */}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
