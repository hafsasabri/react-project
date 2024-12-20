import Layout from "../Layouts/Layouts"; // Importation du composant Layout qui sert de structure pour la page
import Products from "../components/Products"; // Importation du composant Products qui est responsable d'afficher la liste des produits

// Définition du composant Home
const Home = () => {
    return (
      // Utilisation du composant Layout pour structurer la page et y insérer le contenu
      <Layout>
        {/* Affichage du composant Products à l'intérieur du Layout */}
        <Products></Products> 
      </Layout>
    );
}

 // Export du composant Home pour qu'il puisse être utilisé dans d'autres parties de l'application
 export default Home;