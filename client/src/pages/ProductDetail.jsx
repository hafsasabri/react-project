import { useParams } from "react-router-dom"; // Importation de useParams pour récupérer l'ID du produit à partir de l'URL
import Layout from "../Layouts/Layouts"; // Importation du composant Layout pour l'encapsulation générale de la page
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour dispatcher des actions et accéder au state
import { useEffect, useState } from "react"; // Importation de useEffect et useState pour gérer les effets de bord et l'état local
import { productAction } from "../Redux/Actions/Product"; // Importation de l'action pour récupérer les détails du produit
import { addToCartAction } from "../Redux/Actions/Cart"; // Importation de l'action pour ajouter un produit au panier

function ProductDetail() {
  // Récupération de l'ID du produit à partir des paramètres d'URL
  const { id } = useParams();

  // Fonction dispatch pour envoyer des actions Redux
  const dispatch = useDispatch();

  // Accès aux détails du produit dans le state Redux
  const productReducer = useSelector((state) => state.productReducer);
  const { loading, error, product } = productReducer;

  // Récupération des détails du produit lorsque le composant est monté
  useEffect(() => {
    dispatch(productAction(id)); // Envoi de l'action pour récupérer les détails du produit par son ID
  }, [dispatch, id]); // Déclenchement de l'effet lorsque 'dispatch' ou 'id' changent

  // État local pour gérer la quantité sélectionnée dans la page de détails du produit
  const [qty, setQty] = useState(1);

  // Fonction qui ajoute le produit au panier avec la quantité sélectionnée
  const addToCartHandler = () => {
    dispatch(addToCartAction(id, qty)); // Envoi de l'action pour ajouter le produit au panier avec la quantité choisie
  };

  return (
    <Layout>
      {/* Rendu conditionnel en fonction de l'état de chargement ou d'erreur */}
      {loading ? (
        <h1>loading</h1> // Affichage d'un message de chargement si les détails du produit sont en cours de récupération
      ) : error ? (
        <h1>{error}</h1> // Affichage du message d'erreur s'il y a une erreur lors de la récupération du produit
      ) : (
        <>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                {/* Affichage de l'image du produit */}
                <img
                  alt="ecommerce"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={product.image} // Image récupérée des détails du produit
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  {/* Affichage du prix du produit */}
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    Price : ${product.price}
                  </h2>
                  {/* Affichage du nom du produit */}
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {product.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      {/* Affichage des étoiles de notation du produit */}
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      {/* Autres étoiles (total de 5) */}
                      <svg
                        fill="currentColor"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 text-indigo-500"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      {/* Nombre d'avis */}
                      <span className="text-gray-600 ml-3">
                        {product.numReview} Reviews
                      </span>
                    </span>
                  </div>
                  {/* Affichage de la description du produit */}
                  <p className="leading-relaxed">{product.description}</p>
                  {/* Sélection de la couleur et de la quantité */}
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      {/* Options de couleur */}
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>

                    {/* Sélecteur de quantité */}
                    {product.countInStock > 0 ? (
                      <div className="flex ml-6 items-center">
                        <span className="mr-3">Quantity</span>
                        <div className="relative">
                          <select
                            value={qty}
                            onChange={(e) =>
                              setQty(parseInt(e.target.value, 10))
                            }
                            className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                          >
                            {/* Génération dynamique des options de quantité */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <></> // Si aucun produit en stock, on ne montre pas l'option de quantité
                    )}
                  </div>

                  {/* Affichage du prix et du bouton Ajouter au panier */}
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ${product.price}.00
                    </span>

                    {/* Bouton pour ajouter au panier si le produit est en stock */}
                    {product.countInStock > 0 ? (
                      <button
                        onClick={addToCartHandler}
                        className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                      >
                        Add to cart
                      </button>
                    ) : (
                      <h1 className="cursor-not-allowed flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                        Unavailable
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

// Exportation du composant ProductDetail pour qu'il soit utilisé ailleurs dans l'application
export default ProductDetail;
