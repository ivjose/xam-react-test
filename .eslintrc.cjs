module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', 'tsconfig.node.json'],
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],

  globals: {
    React: 'readonly',
  },
  ignorePatterns: ['dist/'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // labelComponents: ['CustomInputLabel'],
        labelAttributes: ['label'],
        // controlComponents: ['CustomInput'],
        depth: 3,
      },
    ],
  },
}
