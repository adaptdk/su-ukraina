module.exports = {
  extends: `stylelint-config-standard`,
  plugins: [`stylelint-order`],
  ignoreFiles: [`**/*.js`],
  rules: {
    "custom-property-pattern": null,
    "order/properties-alphabetical-order": true,
    "no-descending-specificity": null,
    "media-feature-name-disallowed-list": [`max-width`],
    "selector-class-pattern": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: [`export`],
      },
    ],
  },
};
