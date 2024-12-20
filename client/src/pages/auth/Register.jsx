import { useState } from "react"; // Importation de useState pour gérer l'état local
import Layout from "../../Layouts/Layouts"; // Importation du composant Layout qui enveloppe toute la page
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks pour interagir avec Redux (dispatch et selector)
import { userRegisterAction } from "../../Redux/Actions/User"; // Importation de l'action pour enregistrer un utilisateur

// Définition du composant fonctionnel Register
export default function Register() {
  // Déclaration des états locaux pour l'email, le nom et le mot de passe
  const [email, setEmail] = useState(null); 
  const [name, setName] = useState(null); 
  const [password, setPassword] = useState(null);

  // Utilisation du hook useSelector pour accéder à l'état global du reducer userRegisterReducer
  const userRegisterReducer = useSelector((state) => state.userRegisterReducer);

  // Extraction des propriétés loading, error et userInfo du state global
  const { loading, error, userInfo } = userRegisterReducer;

  // Utilisation du hook useDispatch pour envoyer des actions à Redux
  const dispatch = useDispatch();

  // Fonction qui gère la soumission du formulaire
  const submitHandler = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission
    // Envoi de l'action d'enregistrement avec les informations du formulaire
    dispatch(userRegisterAction(name, email, password));
  };

  return (
    <>
      {/* Wrapper principal avec le layout */}
      <Layout>
        {/* Affichage conditionnel basé sur l'état loading ou error */}
        {loading ? (
          <h1>loading</h1> // Message affiché pendant le chargement
        ) : error ? (
          <h1>{error}</h1> // Message d'erreur si l'enregistrement échoue
        ) : (
          <>
            {/* Formulaire d'enregistrement */}
            <form className="max-w-sm mx-auto" onSubmit={submitHandler}>
              {/* Champ pour le nom */}
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="bob"
                  required
                  value={name} // Associe l'état name au champ input
                  onChange={(e) => setName(e.target.value)} // Met à jour l'état name lorsque l'utilisateur tape
                />
              </div>
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
                  onChange={(e) => setEmail(e.target.value)} // Met à jour l'état email lorsque l'utilisateur tape
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
                  onChange={(e) => setPassword(e.target.value)} // Met à jour l'état password lorsque l'utilisateur tape
                />
              </div>
              {/* Case à cocher "Remember me" */}
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
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
