// Importation des hooks nécessaires de React et Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Importation de 'Link' de react-router-dom pour la navigation entre les pages
import { Link } from "react-router-dom";
// Importation de l'action 'productListAction' pour récupérer la liste des produits depuis Redux
import { productListAction } from "../Redux/Actions/Product";

// Définition du composant Products
const Products = () => {
  // Utilisation du hook 'useDispatch' pour dispatcher des actions à Redux
  const dispatch = useDispatch();
  
  // Utilisation du hook 'useSelector' pour accéder à l'état du Redux store
  const productListReducer = useSelector((state) => state.productListReducer);
  
  // Destructuration de l'état produit de Redux : loading, error et products
  const { loading, error, products = [] } = productListReducer;

  // useEffect pour charger la liste des produits au chargement du composant
  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {/* Affichage du texte de chargement si 'loading' est vrai */}
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        // Affichage de l'erreur si une erreur est présente
        <h1>{error}</h1>
      ) : (
        // Si le chargement est terminé et sans erreur, affichage des produits
        <>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              {/* Flexbox pour afficher les produits */}
              <div className="flex flex-wrap -m-4">
                {/* Pour chaque produit, on génère une carte avec les détails */}
                {products.map((product) => (
                  <div className="p-4 lg:w-1/4 md:w-1/2" key={product.id}>
                    <div className="bg-white">
                      {/* Section contenant l'image et les informations du produit */}
                      <div className="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <div className="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                          <div className="group relative">
                            {/* Image du produit */}
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                src={product.image}  // Affichage de l'image du produit
                                alt="Front of men&#039;s Basic Tee in black." // Description alternative de l'image
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full" // Classes pour le style de l'image
                              />
                            </div>
                            {/* Informations du produit */}
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  {/* Lien vers la page de détails du produit */}
                                  <Link to={`/products/${product._id}`}>
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {product.name}
                                  </Link>
                                </h3>
                                {/* Affichage du nombre de revues */}
                                <p className="mt-1 text-sm text-gray-500">
                                  Review Count : {product.numReview}
                                </p>
                              </div>
                              {/* Affichage du prix du produit */}
                              <p className="text-sm font-medium text-gray-900">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Products;
