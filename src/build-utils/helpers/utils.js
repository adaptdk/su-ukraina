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

module.exports = {
  logContentfulWarning,
};
