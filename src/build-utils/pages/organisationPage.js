require(`dotenv`).config();
const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getOrganisationPagePath } = require(`../helpers/hooks`);
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

  organisationPages.forEach((organisationPage) => {
    if (organisationPage?.name && organisationPage?.node_locale) {
      const navigation = globalNavigation
        .filter((item) => item.node_locale === organisationPage.node_locale)
        .shift();

      const pagePath = getOrganisationPagePath(
        organisationPage?.name,
        organisationPage?.node_locale,
        organisationPage?.organisationType
      );

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/organisationPage.jsx`),
        context: {
          ...organisationPage,
          navigation,
        },
      });
    } else {
      logContentfulWarning(
        `Organisation Page`,
        organisationPage.contentful_id,
        organisationPage.node_locale
      );
    }
  });
};

module.exports = {
  query,
  createOrganisationPages,
};
