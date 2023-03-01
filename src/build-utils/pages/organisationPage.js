require(`dotenv`).config();
const path = require(`path`);
const {
  NAVIGATION_ID,
  PROMOLINE_ID,
} = require(`../../constants/contentfulIds`);

const {
  getOrganisationPageSlug,
  getPathByLocale,
  getAllPagesLocalisedValuesByKey,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
    {
      allContentfulOrganisation {
        edges {
          node {
            contentful_id
            name
            node_locale
            organisationType
          }
        }
      }
    }
  `);
};

const createOrganisationPages = (result, createPage) => {
  const organisationPages = result.data.allContentfulOrganisation.edges.map(
    (edge) => edge.node
  );

  // @todo: look at this whole commit with second opinion
  const orgPagesWithSlug = organisationPages.map((page) => {
    return {
      ...page,
      slug: getOrganisationPageSlug(
        page?.name,
        page?.node_locale,
        page?.organisationType
      ),
    };
  });

  const allNodeSlugs = getAllPagesLocalisedValuesByKey(
    orgPagesWithSlug,
    `slug`
  );

  orgPagesWithSlug.forEach((organisationPage) => {
    const locale = organisationPage?.node_locale;
    const id = organisationPage?.contentful_id;

    if (organisationPage?.name && locale) {
      const currentNodeSlugs = allNodeSlugs[id];

      const pagePath = getPathByLocale(locale, organisationPage?.slug);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/organisationPage.jsx`),
        context: {
          id,
          locale,
          currentNodeSlugs,
          navigationId: NAVIGATION_ID,
          promoLineId: PROMOLINE_ID,
        },
      });
    } else {
      logContentfulWarning(`Organisation Page`, id, locale);
    }
  });
};

module.exports = {
  query,
  createOrganisationPages,
};
