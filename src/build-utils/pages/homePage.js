const path = require(`path`);
const {
  HOMEPAGE_ID,
  NAVIGATION_ID,
  PROMOLINE_ID,
} = require(`../../constants/contentfulIds`);

const { getHomePagePath } = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulHomepage(filter: {contentful_id: { eq: "${HOMEPAGE_ID}" }}) {
      edges {
        node {
          id
          contentful_id
          node_locale
          metaTitle
        }
      }
    }
  }
`);
};

const createHomePages = (result, createPage) => {
  const homePages = result.data.allContentfulHomepage.edges.map(
    (edge) => edge.node
  );

  homePages.forEach((homePage) => {
    const id = homePage?.contentful_id;
    const locale = homePage?.node_locale;

    if (homePage?.metaTitle && locale) {
      const pagePath = getHomePagePath(locale);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/homePage.jsx`),
        context: {
          id,
          locale,
          navigationId: NAVIGATION_ID,
          promoLineId: PROMOLINE_ID,
        },
      });
    } else {
      logContentfulWarning(`Home Page`, HOMEPAGE_ID, locale);
    }
  });
};

module.exports = {
  query,
  createHomePages,
};
