module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: "module",
  },
  rules: {
    'import/no-extraneous-dependencies' : 0,
    'vuejs-accessibility/click-events-have-key-events': 0,
    'vuejs-accessibility/form-control-has-label': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 0,
    'prefer-destructuring': 0,
    'no-plusplus': 0,
    'no-useless-concat': 0,
    'import/prefer-default-export': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.spec.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
