import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Linkify from "react-linkify";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import Card from "../../components/Card";
import CardList from "../../components/CardList";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import CardSection from "../../components/Card/CardSection";
import Button from "../../components/Button";
import Tabs from "../../components/Tabs";
import Section from "../../components/Section";

const Page = ({ data }) => {
  const crumbs = [`Budinkite veikti`];
  const additionalNavigation = [`akcijos`, 'renginiai'];
  const content = data.contents.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
      excerpt: edge.node.childMarkdownRemark.excerpt,
    };
  })[0];

  const addressees = data.addressees.edges.map((edge) => {
    return edge.node.childMarkdownRemark.frontmatter;
  });

  const [tabState, setTabState] = React.useState(1);

  function handleTab(tabState) {
    setTabState(tabState);
  }

  return (
    <Layout pagePath="/protesto-formos/budinkite-veikti/">
      {(!content || !content.title) && <Title>Budinkite veikti</Title>}

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../../images/hero/darykite_spaudima.jpg"
          alt="Budinkite veikti"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup
            crumbs={crumbs}
            additionalNav={additionalNavigation}
          />
          <Title>{content.title}</Title>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <Tabs
          handleTab={handleTab}
          tabState={tabState}
          firstOption={`Ambasada`}
          secondOption={`Įmonė`}
        />
        <CardList>
          {addressees.map((addressee, i) => {
            const type = tabState === 1 ? `ambasada` : `įmonė`;
            if (type === addressee.type[0]) {
              return (
                <Card title={addressee.title} key={i}>
                  <div className="Card__type">
                    <ul>
                      {addressee.type.map((singleType, j) => {
                        return <li key={j}>{singleType}</li>;
                      })}
                    </ul>
                  </div>

                  {!!addressee.purpose && (
                    <CardSection
                      title="Kreipimosi klausimas"
                      content={addressee.purpose}
                    />
                  )}
                  {!!addressee.emailOrLink && (
                    <CardSection
                      title="Skaitmeninis kanalas"
                      content={addressee.emailOrLink}
                    />
                  )}
                  {!!addressee.address && (
                    <CardSection title="Adresas" content={addressee.address} />
                  )}

                  <div className={`Card__actions`}>
                    {!!addressee.emailOrLink && (
                      <Button
                        icon={`arrow-blue`}
                        href={`mailto:${addressee.emailOrLink}`}
                        color={`transparent`}
                        text={`Rašyti laišką`}
                        position={`right`}
                        target="_blank"
                      />
                    )}
                  </div>
                </Card>
              );
            }
          })}
        </CardList>
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
          regex: "//src/content/pages/protesto-formos/budinkite-veikti.md$/"
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
    addressees: allFile(
      filter: { sourceInstanceName: { eq: "addressees" } }
      sort: { fields: childMarkdownRemark___frontmatter___weight }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              type
              title
              purpose
              emailOrLink
              address
            }
          }
        }
      }
    }
  }
`;

Page.propTypes = {
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
    addressees: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                type: PropTypes.array,
                title: PropTypes.string,
                purpose: PropTypes.string,
                emailOrLink: PropTypes.string,
                address: PropTypes.string,
              }),
            }),
          }),
        })
      ),
    }),
  }),
};

export default Page;
