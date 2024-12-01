module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'], // Extending recommended ESLint rules and TypeScript rules
  parser: '@typescript-eslint/parser', // Add parser to handle TypeScript
  plugins: ['@typescript-eslint'], // Add typescript plugin
  parserOptions: {
    ecmaVersion: 2020, // Allows you to use modern JavaScript features
    sourceType: 'module', // Use module type for imports
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // You can disable or modify specific rules as needed
  },
};

