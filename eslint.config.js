import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react'; // NOVO: Importamos o plugin
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
        react, // NOVO: Registramos o plugin
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
        react: {
            version: 'detect', // NOVO: Ajuda o plugin a detectar sua versão do React
        },
    },
    rules: {
      // MUDANÇA IMPORTANTE: Desativamos a regra padrão do ESLint,
      // pois ela não entende JSX e entra em conflito com o plugin do React.
      'no-unused-vars': 'off', 
      
      // O plugin do React fornece suas próprias regras mais inteligentes
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error', // <-- ESSA REGRA RESOLVE SEU PROBLEMA

      // Suas outras regras continuam aqui
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
  },
]);