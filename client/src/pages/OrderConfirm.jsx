import { useState, useEffect } from "react"; // Importation de hooks React: useState et useEffect
import Confetti from "react-confetti"; // Importation de la bibliothèque Confetti pour afficher des confettis lors de la confirmation de commande
import Layout from "../Layouts/Layouts"; // Importation du composant Layout pour structurer la page
import { useParams } from "react-router-dom"; // Importation de useParams pour obtenir des paramètres de l'URL, ici l'ID de la commande
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour gérer l'état global et dispatcher des actions
import { orderDetailAction } from "../Redux/Actions/Order"; // Importation de l'action pour récupérer les détails de la commande

const OrderConfirmation = () => {

  const { id } = useParams(); // Récupère l'ID de la commande à partir de l'URL (paramètre dynamique)
  const dispatch = useDispatch(); // Initialisation du dispatch Redux pour envoyer des actions

  // Utilisation de useEffect pour déclencher l'action orderDetailAction au chargement du composant
  useEffect(() => {
    dispatch(orderDetailAction(id)); // Appel à l'action pour récupérer les détails de la commande via l'ID
  }, [dispatch, id]);

  // Sélection de l'état de la commande dans le store Redux
  const orderDetailReducer = useSelector((state) => state.orderDetailReducer);
  const { order, loading } = orderDetailReducer; // Extraction des informations de la commande et de l'état de chargement

  // Confetti state : état pour gérer l'activation ou non des confettis
  const [confettiActive, setConfettiActive] = useState(true);

  // Utilisation de useEffect pour arrêter les confettis après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setConfettiActive(false); // Désactive les confettis après 5 secondes
    }, 5000);

    return () => clearTimeout(timer); // Nettoie le timer au démontage du composant
  }, []);

  return (
    <Layout>
      {loading ? (
        <h1>Loading</h1> // Affiche "Loading" si la commande est en cours de récupération
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-white">
          {confettiActive && <Confetti />} // Affiche les confettis si l'état confettiActive est true
          <div className="p-8 bg-gray-100 rounded-lg shadow-lg text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Payment Successful! // Affiche un message de succès de paiement
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              Thank you for your order. // Message de remerciement pour la commande
            </p>
            <div className="bg-white p-4 rounded shadow-sm mb-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Order Summary // Titre pour le résumé de la commande
              </h2>
              {order && ( // Vérifie si les détails de la commande sont disponibles
                <div className="text-left">
                  <p>
                    <strong>Order ID:</strong> {order._id} // Affiche l'ID de la commande
                  </p>
                  <p>
                    <strong>Payer Name:</strong> {order.user.name}{" "} // Affiche le nom du payeur
                  </p>
                  <p>
                    <strong>Payer Email:</strong> {order.user.email} // Affiche l'email du payeur
                  </p>
                  {/* D'autres détails peuvent être ajoutés ici si nécessaire */}
                </div>
              )} 
            </div>
            {/* Bouton pour rediriger l'utilisateur vers la page d'accueil ou une autre page */}
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
              onClick={() => {
                window.location.href = "/"; // Redirige vers la page d'accueil
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

 // Exportation du composant pour l'utiliser ailleurs
 export default OrderConfirmation;