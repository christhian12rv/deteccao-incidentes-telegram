module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "indent": ["error", 2, { "ignoredNodes": ["PropertyDefinition"] }],
    "linebreak-style": [
        "error",
        "unix"
    ],
    "quotes": [
        "error",
        "single"
    ],
    "semi": [
        "error",
        "always"
    ],
    "comma-dangle": [
        "error", "always-multiline"
    ],
    "brace-style": [
        "error",
        "1tbs",
        {
            "allowSingleLine": false
        }
    ],
    "object-curly-spacing": [
        "error",
        "always"
    ],
    "no-console": 2,
    "curly": [
        "error",
        "all"
    ],
    "@typescript-eslint/explicit-function-return-type": 2,
    "arrow-body-style": [
        "error",
        "as-needed"
    ],
    'prettier/prettier': 0,
  },
};
