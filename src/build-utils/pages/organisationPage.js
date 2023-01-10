require(`dotenv`).config();
const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const {
  getOrganisationPageSlug,
  getPathByLocale,
  getAllPagesLocalisedValuesByKey,
  getCurrentNodeValue,
} = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
    ${contentModel.globalNavigation}
    allContentfulOrganisation {
      edges {
        node {
          contentful_id
          ${contentModel.organisation}
          bigLogo: organisationLogo {
            gatsbyImageData(height: 100, placeholder: BLURRED, formats: WEBP)
          }
          node_locale
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
  const globalNavigation = result.data.allContentfulNavigation.edges.map(
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
  const allOrganisationLogos = getAllPagesLocalisedValuesByKey(
    orgPagesWithSlug,
    `bigLogo`
  );

  orgPagesWithSlug.forEach((organisationPage) => {
    const locale = organisationPage?.node_locale;
    const id = organisationPage?.contentful_id;

    if (organisationPage?.name && locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === locale)
        .shift();

      const currentNodeSlugs = allNodeSlugs[id];
      const ltOrgLogo = getCurrentNodeValue(allOrganisationLogos, id, `lt-LT`);

      const pagePath = getPathByLocale(locale, organisationPage?.slug);

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/organisationPage.jsx`),
        context: {
          ...organisationPage,
          organisationLogo: ltOrgLogo,
          navigation,
          currentNodeSlugs,
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
