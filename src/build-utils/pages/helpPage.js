const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulHelpPage {
      edges {
        node {
          id
          slug
          slidingNav
          ${contentModel.seo}
          ${contentModel.hero}
          pageHeading
          pageDescription {
            raw
          }
          organisations {
            ... on ContentfulOrganisation {
              ${contentModel.organisation}
            }
          }
        }
      }
    }
  }
`);
};

const createHelpPages = (result, createPage) => {
  const helpPages = result.data.allContentfulHelpPage.edges.map((edge) => {
    return edge.node;
  });

  helpPages.forEach((helpPage) => {
    createPage({
      path: `kaip-galiu-padeti/${helpPage.slug}`,
      component: path.resolve(`./src/templates/helpPage.jsx`),
      context: {
        ...helpPage,
      },
    });
  });
};

module.exports = {
  query,
  createHelpPages,
};
