module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: "babel-eslint",
  plugins: [
    "prettier"
  ],
  env: {
    jasmine: true
  },
  globals: {
    ReactClass: true,
    fetch: true,
    FormData: true,
    console: true
  },
  "rules": {
    "prettier/prettier": ["error", {
      "trailingComma": "all",
      "singleQuote": true
    }],
    "camelcase": [0],
    "no-console": ["error", { "allow": ["info", "log", "debug", "warn"] }],
    "no-param-reassign": ["error", { "props": false }],
    "class-methods-use-this": [0, { "exceptMethods": ["render", "componentDidMount", "componentWillMount"] }],
    "func-names": ["error", "never"],
    "no-bitwise": ["error", { "allow": [">>", "<<"] }],
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["limitsValue", "err", "user", "state"] }],
    "radix": ["error", "as-needed"],
    "no-underscore-dangle": 0,
    "no-use-before-define": 0,
    "no-unused-expressions": 0,
    "new-cap": 0,
    "no-plusplus": 0,
    "no-class-assign": 0,
    "no-duplicate-imports": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "react/jsx-filename-extension": [
      0, { "extensions": [".js", ".jsx"] }
    ],
    "react/sort-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 1,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "react/no-unused-prop-types": 0
  }
};
