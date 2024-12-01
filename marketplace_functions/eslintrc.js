module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended', // Use ESLint's recommended rules
    'plugin:@typescript-eslint/recommended', // Use recommended rules from the typescript-eslint plugin
  ],
  plugins: ['@typescript-eslint'], // Add TypeScript plugin
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};

