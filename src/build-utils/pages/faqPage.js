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
            forceTranslate
            categories {
              contentful_id
              ... on ContentfulFaqCategory {
                slug
                pageHeading
              }
            }
          }
        }
      }
    }
  `);
};

const createFaqPages = (result, createPage) => {
  const faqPages = result.data.allContentfulFaqPage.edges.map(
    (edge) => edge.node
  );

  faqPages.forEach((faqPage) => {
    const locale = faqPage?.forceTranslate || faqPage?.node_locale;
    const id = faqPage?.contentful_id;
    if (faqPage?.slug && faqPage?.node_locale === `lt-LT`) {
      const rootPath = getPathByLocale(locale, faqPage?.slug);

      faqPage.categories.forEach((faqCategory) => {
        const categoryPath = `${rootPath}/${faqCategory.slug}`;
        const categoryId = faqCategory.contentful_id;

        createPage({
          path: categoryPath,
          component: path.resolve(`./src/templates/faqPage.jsx`),
          context: {
            pageId: id,
            locale /* fake locale forcing for navigation etc. */,
            node_locale:
              faqPage.node_locale /* real node-locale to query correct categories */,
            categoryId,
            navigationId: NAVIGATION_ID,
            promoLineId: PROMOLINE_ID,
            rootPath,
          },
        });
      });
    }
  });
};

module.exports = {
  query,
  createFaqPages,
};
