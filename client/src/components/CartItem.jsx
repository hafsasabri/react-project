// Importation des hooks nécessaires depuis react-redux pour interagir avec le store Redux
import { useDispatch } from "react-redux";

// Importation des actions Redux pour ajouter et retirer des produits du panier
import { addToCartAction, removeFromCartAction } from "../Redux/Actions/Cart";

// Fonction CartItem qui prend une liste de produits dans le panier en tant que prop
export default function CartItem({ cartItems }) {
  
  // Création du hook dispatch pour envoyer des actions au store Redux
  const dispatch = useDispatch();

  // Fonction pour retirer un produit du panier en appelant l'action removeFromCartAction avec l'ID du produit
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCartAction(id));
  };

  // Fonction pour ajouter un produit au panier ou mettre à jour sa quantité en appelant l'action addToCartAction
  const addToCartHandler = (id, qty) => {
    dispatch(addToCartAction(id, qty));
  };

  return (
    <>
      {/* Conteneur principal pour l'affichage des éléments du panier */}
      <div className="mt-8">
        {/* Conteneur de la liste des produits dans le panier */}
        <div className="flow-root">
          {/* Liste des articles, chaque élément étant divisé par une bordure */}
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {/* Pour chaque produit dans le panier, on crée un élément de liste */}
            {cartItems.map((product) => (
              <li key={product.id} className="flex py-6">
                {/* Section pour l'image du produit */}
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    alt={product.imageAlt} // Texte alternatif pour l'image du produit
                    src={product.image}     // L'URL de l'image du produit
                    className="h-full w-full object-cover object-center" // Style pour ajuster l'image dans le conteneur
                  />
                </div>

                {/* Section pour les informations du produit (nom, prix, quantité, bouton supprimer) */}
                <div className="ml-4 flex flex-1 flex-col">
                  {/* Nom et prix du produit */}
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.name}</a>
                      </h3>
                      <p className="ml-4">${product.price}</p>
                    </div>
                  </div>

                  {/* Section pour la gestion de la quantité et du bouton "Remove" */}
                  <div className="flex flex-1 items-end justify-between text-sm">
                    {/* Sélecteur de quantité du produit */}
                    <p className="text-gray-500">
                      Qty
                      {/* Sélecteur pour modifier la quantité du produit */}
                      <select
                        value={product.qty} // Valeur de la quantité actuelle du produit
                        onChange={(e) => // Action lorsque l'utilisateur change la quantité
                          addToCartHandler(
                            product.product, // ID du produit
                            Number(e.target.value) // Valeur de la quantité sélectionnée
                          )
                        }
                        className="rounded ml-2 border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                      >
                        {/* Créer une option pour chaque quantité disponible jusqu'à la quantité en stock */}
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </p>

                    {/* Bouton pour supprimer un produit du panier */}
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeFromCartHandler(product.product)} // Appel de la fonction pour supprimer un produit
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
