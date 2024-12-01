module.exports = {
  parser: '@typescript-eslint/parser', // Use the TypeScript parser
  extends: [
    'eslint:recommended', // Use ESLint's recommended rules
    'plugin:@typescript-eslint/recommended', // Use recommended TypeScript rules
  ],
  plugins: ['@typescript-eslint'], // Add TypeScript plugin
  parserOptions: {
    ecmaVersion: 2020, // Use ECMAScript 2020 features
    sourceType: 'module', // Allows the use of imports
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Optional: Turn off explicit return types for functions
  },
};

