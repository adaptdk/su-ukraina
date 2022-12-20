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
    actions.createPage({
      path: `/informacija-lietuviams/${slug}/`,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        slug: `/${slug}`,
        sourceInstanceName: `lithuanian-guide`,
        title: `Informacija lietuviams`,
      },
    });
  });

  data.refugeeGuideLt.edges.forEach((edge) => {
    const slug = edge.node.childMarkdownRemark.frontmatter.slug.slice(1);
    actions.createPage({
      path: `/informacija-ukrainieciams/${slug}/`,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        slug: `/${slug}`,
        sourceInstanceName: `refugee-guide-lt`,
        title: `Informacija ukrainiečiams`,
      },
    });
  });

  data.refugeeGuideUa.edges.forEach((edge) => {
    const slug = edge.node.childMarkdownRemark.frontmatter.slug.slice(1);
    actions.createPage({
      path: `/ua/refugee-guide/${slug}/`,
      component: require.resolve(`./src/templates/guide-page.js`),
      context: {
        slug: `/${slug}`,
        sourceInstanceName: `refugee-guide`,
        title: `Важлива інформація`,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      questions: [MarkdownRemarkFrontmatterQuestions]
    }
    type MarkdownRemarkFrontmatterQuestions {
      content_blocks: [MarkdownRemarkFrontmatterQuestionsContent_blocks]
    }
    type MarkdownRemarkFrontmatterQuestionsContent_blocks {
      image: File @fileByRelativePath
    }
  `;

  createTypes(typeDefs);
};
