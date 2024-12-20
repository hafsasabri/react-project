const Footer = () => {
    return (
      // Début du composant footer avec un fond blanc, des bords arrondis et une ombre
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          
          {/* Section avec un alignement horizontal des éléments (logo et liens) */}
          <div className="sm:flex sm:items-center sm:justify-between">
          
            {/* Lien contenant le logo et le nom du site */}
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo" // Description du logo pour les lecteurs d'écran
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Node Shop.
              </span>
            </a>
  
            {/* Liste des liens de navigation (About, Privacy Policy, etc.) */}
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
  
          {/* Ligne de séparation entre les sections */}
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          
          {/* Section avec les informations sur les droits d'auteur */}
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Sai Ko™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    );
  };
  // Exportation du composant Footer pour l'utiliser ailleurs dans l'application
  export default Footer;
  