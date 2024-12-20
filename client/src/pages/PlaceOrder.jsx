import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour gérer l'état
import Layout from "../Layouts/Layouts"; // Importation du composant de mise en page
import CartItem from "../components/CartItem"; // Importation du composant qui affiche les articles du panier
import { useEffect, useState } from "react"; // Importation des hooks React pour l'état et les effets
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Importation de PayPal pour intégrer le paiement
import axios from "axios"; // Importation de Axios pour effectuer des requêtes HTTP
import { BASE_URL } from "../Redux/Constants/BASE_URL"; // Importation de l'URL de base pour l'API
import { orderAction, orderPaymentAction } from "../Redux/Actions/Order"; // Actions Redux pour créer une commande et gérer le paiement
import { saveShippingAddressAction } from "../Redux/Actions/Cart"; // Action Redux pour enregistrer l'adresse de livraison
import { ORDER_RESET } from "../Redux/Constants/Order"; // Action Redux pour réinitialiser l'état de la commande
import { useNavigate } from "react-router-dom"; // Hook React Router pour naviguer entre les pages

export default function PlaceOrder() {
  // Utilisation de useSelector pour accéder à l'état du panier (cart)
  const cart = useSelector((state) => state.cartReducer);
  const { cartItems, shippingAddress } = cart;

  // Fonction pour arrondir les valeurs numériques à deux décimales
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2); // Arrondir à 2 décimales
  };

  // Calcul des prix de la commande
  const subtotal = addDecimal(
    cartItems.reduce((total, item) => total + item.qty * item.price, 0)
  ); // Calcul du sous-total (prix des articles)
  const taxPrice = addDecimal(Number(0.15 * subtotal).toFixed(2)); // Calcul de la taxe (15% du sous-total)
  const shippingPrice = addDecimal(subtotal > 100 ? 0 : 20); // Frais de livraison : gratuit si total > 100, sinon 20$
  const total = (
    Number(subtotal) +
    Number(taxPrice) +
    Number(shippingPrice)
  ).toFixed(2); // Calcul du total de la commande (sous-total + taxe + frais de livraison)

  // Gestion des champs d'adresse de livraison dans l'état local
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const [clientId, setClientId] = useState(null); // État pour stocker l'ID client PayPal

  // Accès à l'état de la commande via Redux
  const orderReducer = useSelector((state) => state.orderReducer);
  const { order, success } = orderReducer; // Récupération de l'ordre et de son statut
  const [paymentResult, setPaymentResult] = useState({}); // Résultat du paiement

  const navigate = useNavigate(); // Hook pour la navigation entre les pages

  // useEffect pour récupérer l'ID client PayPal et gérer la redirection après une commande réussie
  useEffect(() => {
    getPaypalClientID();

    // Si la commande est réussie, réinitialiser l'état et naviguer vers la page de la commande
    if (success) {
      dispatch({ type: ORDER_RESET }); // Réinitialiser l'état de la commande
      dispatch(orderPaymentAction(order._id, paymentResult)); // Mettre à jour le paiement de la commande
      navigate(`/order/${order._id}`, {}); // Naviguer vers la page de confirmation de la commande
    }
  });

  // Fonction pour récupérer l'ID client PayPal depuis l'API
  const getPaypalClientID = async () => {
    const response = await axios.get(`${BASE_URL}/api/config/paypal`); // Requête pour récupérer l'ID client
    const fetchedClientId = response.data; // Extraction de l'ID client depuis la réponse
    setClientId(fetchedClientId); // Sauvegarde de l'ID client dans l'état local
  };

  const dispatch = useDispatch(); // Hook pour obtenir la fonction dispatch de Redux

  // Fonction appelée lors de la réussite du paiement PayPal
  const successPaymentHandler = async (paymentResult) => {
    try {
      setPaymentResult(paymentResult); // Sauvegarder les résultats du paiement
      // Envoyer une action pour créer la commande avec les détails
      dispatch(
        orderAction({
          orderItems: cart.cartItems, // Articles du panier
          shippingAddress: cart.shippingAddress, // Adresse de livraison
          totalPrice: total, // Prix total
          paymentMethod: "paypal", // Méthode de paiement
          price: subtotal, // Sous-total
          taxPrice: taxPrice, // Taxe
          shippingPrice: shippingPrice, // Frais de livraison
        })
      );
    } catch (err) {
      console.log(err); // Afficher les erreurs dans la console
    }
  };

  // Fonction pour sauvegarder l'adresse de livraison dans l'état global via Redux
  const saveShippingAddress = () => {
    dispatch(
      saveShippingAddressAction({
        address, // Adresse
        city, // Ville
        postalCode, // Code postal
        country, // Pays
      })
    );
  };

  return (
    <>
      <Layout> {/* Composant de mise en page */}
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {/* Section récapitulative des articles du panier */}
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  Order Summary
                </h2>
                <p className="leading-relaxed mb-4">
                  <CartItem cartItems={cartItems}></CartItem> {/* Affichage des articles du panier */}
                </p>
                {/* Affichage des détails de la commande (sous-total, taxe, frais de livraison, total) */}
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="ml-auto text-gray-900">${subtotal}</span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Tax</span>
                  <span className="ml-auto text-gray-900">${taxPrice}</span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Shipping Price</span>
                  <span className="ml-auto text-gray-900">${shippingPrice}</span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${total} {/* Affichage du total */}
                  </span>
                </div>
              </div>

              {/* Section pour l'adresse de livraison */}
              <div className="lg:w-1/3 md:w-1/2  p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                  Shipping Address
                </h2>
                {/* Formulaire pour saisir l'adresse de livraison */}
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} // Mise à jour de l'adresse
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {/* Formulaire pour la ville */}
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} // Mise à jour de la ville
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {/* Formulaire pour le code postal */}
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Postalcode
                  </label>
                  <input
                    type="text"
                    id="postalcode"
                    name="postalcode"
                    value={postalCode}
                    onChange={(e) => setpostalCode(e.target.value)} // Mise à jour du code postal
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                {/* Formulaire pour le pays */}
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} // Mise à jour du pays
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                {/* Bouton pour sauvegarder l'adresse */}
                <button
                  onClick={saveShippingAddress}
                  className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Save Address
                </button>

                {/* Intégration du bouton PayPal */}
                <PayPalScriptProvider options={{ "client-id": clientId }}>
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "gold",
                      shape: "rect",
                      label: "pay",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total, // Montant total pour le paiement
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        successPaymentHandler(details); // Traitement après la réussite du paiement
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
