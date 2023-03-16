const path = require(`path`);
const {
  NAVIGATION_ID,
  PROMOLINE_ID,
} = require(`../../constants/contentfulIds`);

const { getPathByLocale } = require(`../helpers/hooks`);

const query = (graphql) => {
  return graphql(`
    {
      allContentfulFaqPage(filter: { node_locale: { eq: "lt-LT" } }) {
        edges {
          node {
            contentful_id
            node_locale
            slug
            metaTitle
            forceTranslate
          }
        }
      }
    }
  `);
};

const createFaqIndexPages = (result, createPage) => {
  const faqIndexPages = result.data.allContentfulFaqPage.edges.map(
    (edge) => edge.node
  );

  faqIndexPages.forEach((faqIndexPage) => {
    const locale = faqIndexPage?.forceTranslate || faqIndexPage?.node_locale;
    const id = faqIndexPage.contentful_id;
    if (
      faqIndexPage?.slug &&
      faqIndexPage?.metaTitle &&
      faqIndexPage?.node_locale === `lt-LT`
    ) {
      const pagePath = getPathByLocale(locale, faqIndexPage.slug);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/faqIndexPage.jsx`),
        context: {
          id,
          locale,
          node_locale: faqIndexPage.node_locale,
          navigationId: NAVIGATION_ID,
          promoLineId: PROMOLINE_ID,
          rootPath: pagePath,
        },
      });
    }
  });
};

module.exports = {
  query,
  createFaqIndexPages,
};
