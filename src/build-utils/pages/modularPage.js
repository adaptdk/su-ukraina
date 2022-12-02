const path = require(`path`);

const contentModel = require(`../helpers/contentfulContentModel`);

const query = (graphql) => {
  return graphql(`
  {
    allContentfulModularPage {
      edges {
        node {
          id
          slug
          ${contentModel.seo}
          ${contentModel.hero}
          pageHeading
          pageDescription {
            raw
          }
          modules {
            ... on Node {
              id
              internal {
                type
              }
              ... on ContentfulEventsModule {
                ${contentModel.eventsModule}
              }
            }
          }
        }
      }
    }
  }
`);
};

const createModularPages = (result, createPage) => {
  const modularPages = result.data.allContentfulModularPage.edges.map(
    (edge) => {
      return edge.node;
    }
  );

  modularPages.forEach((modularPage) => {
    createPage({
      path: `${modularPage.slug}`,
      component: path.resolve(`./src/templates/modularPage.jsx`),
      context: {
        ...modularPage,
      },
    });
  });
};

module.exports = {
  query,
  createModularPages,
};
