const js = require('@eslint/js');

module.exports = [
  {
    ignores: ['node_modules/**']
  },
  js.configs.recommended,
  {
    files: ['assets/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: {
        document: 'readonly',
        window: 'readonly',
        URL: 'readonly',
        fetch: 'readonly',
        console: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
];
