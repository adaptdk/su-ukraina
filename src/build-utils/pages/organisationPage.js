require(`dotenv`).config();
const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);
const { getOrganisationPagePath } = require(`../helpers/hooks`);
const { logContentfulWarning } = require(`../helpers/utils`);

const query = (graphql) => {
  return graphql(`
  {
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
    (edge) => {
      return edge.node;
    }
  );

  organisationPages.forEach((organisationPage) => {
    if (organisationPage?.name && organisationPage?.node_locale) {
      const pagePath = getOrganisationPagePath(
        organisationPage?.name,
        organisationPage?.node_locale
      );

      createPage({
        path: pagePath,
        component: path.resolve(`./src/templates/organisationPage.jsx`),
        context: {
          ...organisationPage,
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
