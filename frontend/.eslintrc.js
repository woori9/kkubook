module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-vars': 0,
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': [
      0,
      {
        ignore: ['ignore'],
        customValidators: ['customValidator'],
        skipUndeclared: true,
      },
    ],
    camelcase: 'off',
    "jsx-a11y/label-has-associated-control": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "jsx-a11y/label-has-for": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "no-shadow": "off",
  },
};
