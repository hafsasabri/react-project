module.exports = {
    root: true, // Définit ce fichier comme la configuration ESLint principale pour ce projet, empêchant la recherche de configurations supérieures.
    env: { browser: true, es2020: true }, // Spécifie l'environnement dans lequel le code s'exécute. Ici, il s'agit d'un environnement de navigateur et ES2020.
    
    // Spécifie les configurations de règles que ce projet va étendre.
    extends: [
      'eslint:recommended', // Utilise les règles de base recommandées par ESLint (par exemple, vérifier les erreurs de syntaxe communes).
      'plugin:react/recommended', // Applique les règles de React recommandées par ESLint.
      'plugin:react/jsx-runtime', // Utilise la configuration de JSX pour React 17 et supérieur (React 17 a introduit un mode JSX qui ne nécessite pas d'importation explicite de React).
      'plugin:react-hooks/recommended', // Applique les règles recommandées pour l'utilisation des hooks React.
    ],
  
    ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignore les dossiers et fichiers spécifiés ici pour l'analyse ESLint (par exemple, le dossier `dist` de distribution ou la configuration `.eslintrc.cjs`).
    
    // Définition des options pour le parser de JavaScript. `ecmaVersion: 'latest'` assure que la dernière version de JavaScript est utilisée (incluant les fonctionnalités ECMAScript récentes).
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // Le code JavaScript est traité comme un module ES6.
    
    settings: { react: { version: '18.2' } }, // Indique à ESLint que la version de React utilisée dans ce projet est la 18.2. Cela permet à ESLint d'appliquer les bonnes règles spécifiques à React.
    
    plugins: ['react-refresh'], // Inclut le plugin `react-refresh` pour activer le rafraîchissement rapide lors du développement avec React. Cela permet de recharger les composants React rapidement sans perdre leur état.
    
    rules: {
      'react-refresh/only-export-components': [
        'warn', // Si cette règle est violée, ESLint va seulement afficher un avertissement.
        { allowConstantExport: true }, // Permet d'exporter des composants qui sont des variables constantes, en ignorant cette règle pour ceux-là.
      ],
    },
  };
  