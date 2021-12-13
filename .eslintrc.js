module.exports = {
    ignorePatterns: ['src/api/**/*'],
    env: {
      es2021: true,
      node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 13,
      sourceType: 'module',
    },
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    plugins: ['@typescript-eslint'],
    rules: {
      indent: ['error', 2],
      semi: ['error', 'always'],
      'no-trailing-spaces': 0,
      'keyword-spacing': 0,
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars': 1,
      'no-multiple-empty-lines': 0,
      'space-before-function-paren': 0,
      'eol-last': 0,
      
    },
    overrides: [
      {
        files: ['*.ts', '*.tsx'], // Your TypeScript files extension
        parserOptions: {
          project: ['./tsconfig.json'], // Specify it only for TypeScript files
        },
      },
    ],
  };