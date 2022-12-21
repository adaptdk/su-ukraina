import * as React from "react";
import PropTypes from "prop-types";
import { Meta } from "react-head";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import Constraint from "../Constraint";
import Section from "../Section";
import PromoLine from "../PromoLine";
import Button from "../Button";

// Constants.
import {
  NAVIGATION_ITEM_HELP,
  NAVIGATION_MAIN_MENU_ALT,
} from "../../constants/Navigation";

// Helpers
import { isUkrainianPage } from "../../helpers/handlers";

import "./Layout.css";
import PageTitle from "../PageTitle";
import { navigationPropTypes } from "../../helpers/genericPropTypes";

const Layout = ({
  children,
  noStickyHeader,
  pagePath,
  metaTitle,
  metaDescription,
  includeContactForm,
  navigation,
}) => {
  const isUa = isUkrainianPage();

  return (
    <div className="Layout">
      <PageTitle title={metaTitle || ``} />
      <Meta name="description" content={metaDescription || ``} />
      <Header navigation={navigation} noSticky={noStickyHeader} />
      {!isUa && (
        <PromoLine
          title="Вся важлива інформація для громадян України"
          subtitle="Svarbiausia informacija Ukrainos piliečiams"
          titleLink={NAVIGATION_ITEM_HELP.pathname}
        >
          {NAVIGATION_MAIN_MENU_ALT.map((item) => {
            return (
              <Button
                key={item.pathname}
                endIcon={`arrow-blue`}
                to={item.pathname}
                color={`secondary`}
                target="_blank"
                rel="noopener"
              >
                {item.altTitle || item.title}
                <span>{item.translation}</span>
              </Button>
            );
          })}
        </PromoLine>
      )}
      <main>{children}</main>

      {includeContactForm && (
        <Section className="ContactFormSection" bgColor="blue">
          <Constraint>
            <ContactForm returnDestination={pagePath} />
          </Constraint>
        </Section>
      )}

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pagePath: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  noStickyHeader: PropTypes.bool,
  includeContactForm: PropTypes.bool,
  navigation: navigationPropTypes.isRequired,
};

Layout.defaultProps = {
  noStickyHeader: false,
  includeContactForm: true,
};

export default Layout;
