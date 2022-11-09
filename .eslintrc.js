/* @flow */

module.exports = {
  extends: "@krakenjs/eslint-config-grumbler/eslintrc-browser",

  globals: {
    __sdk__: true,
    __lebowski_pay__: true,
  },

  rules: {
    "import/export": "off",
  },
};
