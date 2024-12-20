import { useDispatch, useSelector } from "react-redux"; // Importation des hooks pour interagir avec Redux (dispatch et selector)
import Layout from "../../Layouts/Layouts"; // Importation du composant Layout pour l'usage de la structure générale de la page
import { userLoginAction } from "../../Redux/Actions/User"; // Importation de l'action userLoginAction pour gérer la connexion
import { useState } from "react"; // Importation du hook useState pour gérer les états locaux du formulaire

// Définition du composant fonctionnel Login
export default function Login() {
  // Déclaration des états locaux pour l'email et le mot de passe
  const [email, setEmail] = useState(null); 
  const [password, setPassword] = useState(null);
  
  // Utilisation du hook useSelector pour accéder à l'état global du reducer userLoginReducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer);

  // Extraction des propriétés loading et error du state global
  const { loading, error } = userLoginReducer;
  
  // Utilisation du hook useDispatch pour envoyer des actions à Redux
  const dispatch = useDispatch();

  // Fonction de gestion de l'envoi du formulaire
  const submitHandler = (e) => {
    e.preventDefault(); // Prévenir le comportement par défaut du formulaire (rechargement de la page)
    dispatch(userLoginAction(email, password)); // Envoi de l'action pour se connecter avec les informations saisies
  };

  return (
    <>
      {/* Wrapper principal avec le layout */}
      <Layout>
        {/* Affichage conditionnel basé sur l'état loading ou error */}
        {loading ? (
          <h1>loading</h1> // Message pendant le chargement
        ) : error ? (
          <h1>{error}</h1> // Message d'erreur si une erreur est survenue
        ) : (
          <>
            {/* Formulaire de connexion */}
            <form className="max-w-sm mx-auto h-5/6" onSubmit={submitHandler}>
              {/* Champ pour l'email */}
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  value={email} // Associe l'état email au champ input
                  onChange={(e) => setEmail(e.target.value)} // Met à jour l'état lorsque l'utilisateur tape
                />
              </div>

              {/* Champ pour le mot de passe */}
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password} // Associe l'état password au champ input
                  onChange={(e) => setPassword(e.target.value)} // Met à jour l'état lorsque l'utilisateur tape
                />
              </div>
              
              {/* Bouton de soumission du formulaire */}
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </Layout>
    </>
  );
}
