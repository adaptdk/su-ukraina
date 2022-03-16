module.exports = {
  extends: [
    `eslint:recommended`,
    `plugin:react/recommended`,
    `plugin:prettier/recommended`,
  ],
  settings: {
    react: {
      version: `detect`,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [`react`],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: `module`,
  },
  rules: {
    "arrow-body-style": [`error`, `always`],
    "eol-last": [`error`, `always`],
    "linebreak-style": [`error`, `unix`],
    "no-alert": `error`,
    "no-multiple-empty-lines": [`error`, { max: 1, maxEOF: 2 }],
    "prettier/prettier": `error`,
    quotes: [`error`, `backtick`],
    "react/jsx-no-target-blank": [`error`, { allowReferrer: true }],
  },
};
