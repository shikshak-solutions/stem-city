import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended,
    ...pluginReact.configs.flat.recommended,
    ignores: ["build/**/*"],
    rules: {
      'no-unused-vars': 'error', // Throw error for unused variables
      'react/jsx-uses-react': 'error', // Prevent React from being incorrectly marked as unused
      'react/jsx-uses-vars': 'error', // Prevent variables used in JSX from being incorrectly marked as unused
    },
  },
];
