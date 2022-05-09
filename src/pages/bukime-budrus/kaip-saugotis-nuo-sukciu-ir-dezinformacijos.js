import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import { ResourceList, ResourceListItem } from "../../components/ResourceList";
import SubPage from "../../components/SubPage";
import Section from "../../components/Section";

const Page = ({ data, pageContext }) => {
  const {
    breadcrumb: { crumbs },
  } = pageContext;
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const handbooks = data.handbooks.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  return (
    <Layout pagePath="/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/">
      <Title>Kaip saugotis nuo sukčių ir dezinformacijos</Title>

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/sukciai_dezinformacija.jpg"
          alt="Budinkite veikti"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        {handbooks.map((handbook, i) => {
          return (
            <SubPage
              key={i}
              title={handbook.title}
              intro={handbook.html}
              image={handbook.image}
              imageIsLeft={handbook.imageIsLeft}
            >
              <ResourceList title="Resursai">
                {handbook.resources?.map((resource, j) => {
                  return (
                    <ResourceListItem
                      key={j}
                      title={resource.title}
                      subtitle={resource.subtitle}
                      url={resource.link}
                      buttonText={`Šaltinis`}
                    />
                  );
                })}
              </ResourceList>
            </SubPage>
          );
        })}
      </Constraint>
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos.md$/"
        }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
            }
            html
            excerpt(format: PLAIN, pruneLength: 160)
          }
        }
      }
    }
    handbooks: allFile(
      filter: {
        sourceInstanceName: { eq: "beware-of-scams-and-misinformation" }
      }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              resources {
                title
                subtitle
                link
              }
              intro
              image {
                childImageSharp {
                  gatsbyImageData(height: 500, placeholder: NONE)
                }
              }
              imageIsLeft
            }
            html
          }
        }
      }
    }
  }
`;

Page.propTypes = {
  pageContext: PropTypes.shape({
    breadcrumb: PropTypes.shape({
      crumbs: PropTypes.array,
    }),
  }),
  data: PropTypes.shape({
    contents: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
            excerpt: PropTypes.string,
          }),
        })
      ),
    }),
    handbooks: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                intro: PropTypes.string,
                image: PropTypes.string,
                imageIsLeft: PropTypes.bool,
                resources: PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    subtitle: PropTypes.string,
                    link: PropTypes.string,
                  })
                ),
              }),
            }),
          }),
          html: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Page;
