import * as React from "react";
import PropTypes from "prop-types";
import { Meta } from "react-head";
import { StaticImage } from "gatsby-plugin-image";

import { Card, CardList, CardSection } from "../../components/Organisation";
import Constraint from "../../components/Constraint";
import Layout from "../../components/Layout";
import NavigationGroup from "../../components/NavigationGroup";
import Button from "../../components/Button";
import Section from "../../components/Section";
import TabsButton from "../../components/TabsButton";
import PageTitle from "../../components/PageTitle";

const Page = ({ content, addressees, pagePath, crumbs }) => {
  return (
    <Layout pagePath={pagePath}>
      {(!content || !content.title) && <PageTitle title="Budinkite veikti" />}

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
          <NavigationGroup crumbs={crumbs} />
          <PageTitle title={content.title} />
          <h1>{content.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
          <Meta name="description" content={content.excerpt} />
        </Constraint>
      )}

      <Constraint>
        <section className="TabsContainer">
          <TabsButton
            pagePath={pagePath}
            text={`Ambasada`}
            to={`/protesto-formos/budinkite-veikti/ambasada/`}
          />
          <TabsButton
            pagePath={pagePath}
            text={`Įmonė`}
            to={`/protesto-formos/budinkite-veikti/imone/`}
          />
        </section>
        <CardList>
          {addressees.map((addressee, i) => {
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
                      endIcon={`arrow-blue`}
                      href={`mailto:${addressee.emailOrLink}`}
                      color={`transparent`}
                      target="_blank"
                    >
                      Rašyti laišką
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </CardList>
      </Constraint>
    </Layout>
  );
};

Page.propTypes = {
  crumbs: PropTypes.array,
  content: PropTypes.shape({
    title: PropTypes.string,
    html: PropTypes.string,
    excerpt: PropTypes.string,
  }),
  addressees: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.array,
      title: PropTypes.string,
      purpose: PropTypes.string,
      emailOrLink: PropTypes.string,
      address: PropTypes.string,
    })
  ),
  pagePath: PropTypes.string,
};

export default Page;
