/**
 * Logs a warning in your terminal when creating a page.
 *
 * This warning is useful to see that some of your pages are perhaps missing an important field,
 * like a `slug` and you can easily check it with the provided Contentful link.
 *
 * @param {*} type Type of item/page, for example `Organisation Page`
 * @param {*} id Queried by GraphQL `contentful_id`. Each node in contentful will have that.
 * @param {*} locale Queried by GraphQL `node_locale`.
 */
const logContentfulWarning = (type, id, locale) => {
  console.warn(
    `Failed creating \x1b[32m${type}\x1b[0m for \x1b[33m${locale}\x1b[0m locale.
    Link to Contentful entry: https://app.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries/${id}`
  );
};

const HELP_PAGE_PREFIXES = {
  [`lt-LT`]: `kaip-galiu-padeti`,
  [`uk-UA`]: `dopomoha`,
  en: `help`,
};

/**
 * Utility to get nested object values by string path.
 *
 * For example if you have an object `a: { b: { c: 3 }}`, passing
 * in the path as `"a.b.c"` would return the value of `c` - `3`.
 * @param {string} path String path, for example `item.subitem`.
 * @param {object} object
 * @returns {*} Any value of path's key.
 */
const getObjectValueByStringPath = (path, object) => {
  // reduce() referenced from stackoverflow
  // https://stackoverflow.com/a/43849204
  return path.split(`.`).reduce((prevValue, currValue) => {
    return (prevValue && prevValue[currValue]) || null;
  }, object);
};

module.exports = {
  logContentfulWarning,
  HELP_PAGE_PREFIXES,
  getObjectValueByStringPath,
};
