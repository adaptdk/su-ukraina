exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      lithuanianGuide: allFile(
        filter: { sourceInstanceName: { eq: "lithuanian-guide" } }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
          }
        }
      }
      refugeeGuideLt: allFile(
        filter: { sourceInstanceName: { eq: "refugee-guide-lt" } }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
          }
        }
      }
      refugeeGuideUa: allFile(
        filter: { sourceInstanceName: { eq: "refugee-guide" } }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    }
  `);

  data.lithuanianGuide.edges.forEach((edge) => {
    const slug = edge.node.childMarkdownRemark.frontmatter.slug.slice(1);
    const path = `/informacija-lietuviams/${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        path,
        slug: `/${slug}`,
        sourceInstanceName: `lithuanian-guide`,
        title: `Informacija lietuviams`,
      },
    });
  });

  data.refugeeGuideLt.edges.forEach((edge) => {
    const slug = edge.node.childMarkdownRemark.frontmatter.slug.slice(1);
    const path = `/informacija-ukrainieciams/${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        path,
        slug: `/${slug}`,
        sourceInstanceName: `refugee-guide-lt`,
        title: `Informacija ukrainiečiams`,
      },
    });
  });

  data.refugeeGuideUa.edges.forEach((edge) => {
    const slug = edge.node.childMarkdownRemark.frontmatter.slug.slice(1);
    const path = `/ua/refugee-guide/${slug}`;
    actions.createPage({
      path,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        path,
        slug: `/${slug}`,
        sourceInstanceName: `refugee-guide`,
        title: `Важлива інформація`,
      },
    });
  });
};
