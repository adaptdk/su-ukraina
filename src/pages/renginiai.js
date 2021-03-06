import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Title, Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import Constraint from "../components/Constraint";
import Layout from "../components/Layout";
import NavigationGroup from "../components/NavigationGroup";
import EventCard from "../components/EventCard";
import EventCardList from "../components/EventCardList";
import Section from "../components/Section";
import DetailsWrapper from "../components/DetailsWrapper";

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

  const events = data.events.edges.map((edge) => {
    return {
      ...edge.node.childMarkdownRemark.frontmatter,
      html: edge.node.childMarkdownRemark.html,
    };
  });

  const currentDate = new Date();
  const upcomingEvents = [];
  const previousEvents = [];

  events.forEach((event) => {
    const startDate = new Date(event.startDate);

    if (event.endDate) {
      const endDate = new Date(event.endDate);
      if (currentDate > endDate) {
        previousEvents.unshift(event);
      } else {
        upcomingEvents.push(event);
      }
    } else if (currentDate > startDate) {
      previousEvents.unshift(event);
    } else {
      upcomingEvents.push(event);
    }
  });

  return (
    <Layout pagePath="/renginiai/">
      {(!content || !content.title) && <Title>Renginiai</Title>}

      <Section className="HeroSectionB">
        <StaticImage
          className="HeroSectionB__background"
          src="../images/hero/akcijos_ir_renginiai.jpg"
          alt="Su Ukraina!"
          layout="fullWidth"
        />
      </Section>

      {!!content && (
        <Constraint>
          <NavigationGroup crumbs={crumbs} />
          <Title>{content.title}</Title>
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <h2>Organizuojami renginiai</h2>
        <EventCardList>
          {upcomingEvents.length ? (
            upcomingEvents.map((event, i) => {
              return (
                <EventCard
                  key={i}
                  type={event.eventType}
                  title={event.title}
                  organizer={event.eventOrganizer}
                  startDate={event.startDate}
                  endDate={event.endDate}
                  location={event.location}
                  description={event.html}
                  url={event.eventUrl}
                />
              );
            })
          ) : (
            <p>Numatom?? rengini?? kol kas n??ra.</p>
          )}
        </EventCardList>
      </Constraint>

      {!!previousEvents.length && (
        <Constraint>
          <DetailsWrapper tag="h2" summary="Pra??j?? renginiai">
            <EventCardList>
              {previousEvents.map((event, i) => {
                return (
                  <EventCard
                    key={i}
                    className="EventCard--previous"
                    type={event.eventType}
                    title={event.title}
                    organizer={event.eventOrganizer}
                    startDate={event.startDate}
                    endDate={event.endDate}
                    location={event.location}
                    description={event.html}
                    url={event.eventUrl}
                  />
                );
              })}
            </EventCardList>
          </DetailsWrapper>
        </Constraint>
      )}
    </Layout>
  );
};

export const query = graphql`
  query {
    contents: allFile(
      filter: {
        sourceInstanceName: { eq: "page-contents" }
        absolutePath: {
          regex: "//src/content/pages/protesto-formos/renginiai.md$/"
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
    events: allFile(
      filter: { sourceInstanceName: { eq: "events" } }
      sort: { fields: childMarkdownRemark___frontmatter___startDate }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              eventType
              title
              eventOrganizer
              startDate
              endDate
              location
              eventUrl
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
    events: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            childMarkdownRemark: PropTypes.shape({
              frontmatter: PropTypes.shape({
                title: PropTypes.string,
                date: PropTypes.string,
                location: PropTypes.string,
              }),
            }),
            html: PropTypes.string,
          }),
        })
      ),
    }),
  }),
};

export default Page;
