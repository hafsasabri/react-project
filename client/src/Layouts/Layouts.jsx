import Footer from "./Footer";  // Importation du composant Footer
import Navbar from "./Navbar";  // Importation du composant Navbar

// Définition du composant Layout, qui prend "children" en tant que prop
const Layout = ({ children }) => {
  return (
    <>
      {/* Affichage du composant Navbar en haut de la page */}
      <Navbar />
      
      {/* Contenu principal de la page. Les enfants (contenu dynamique) sont rendus ici. */}
      <main>{children}</main>
      
      {/* Affichage du composant Footer en bas de la page */}
      <Footer />
    </>
  );
};

// Exportation du composant Layout pour l'utiliser ailleurs dans l'application
export default Layout;
