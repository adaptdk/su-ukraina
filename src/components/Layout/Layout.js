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

import "./Layout.css";
import PageTitle from "../PageTitle";
import {
  localePropType,
  navigationPropTypes,
} from "../../helpers/genericPropTypes";

const Layout = ({
  children,
  noStickyHeader,
  pagePath,
  metaTitle,
  metaDescription,
  includeContactForm,
  navigation,
  locale,
}) => {
  return (
    <div className="Layout">
      <PageTitle title={metaTitle || ``} />
      <Meta name="description" content={metaDescription || ``} />
      <Header
        navigation={navigation}
        noSticky={noStickyHeader}
        locale={locale}
      />
      {locale === `lt-LT` && (
        // @todo: connect to contentful
        <PromoLine
          title="Вся важлива інформація для громадян України"
          subtitle="Svarbiausia informacija Ukrainos piliečiams"
          titleLink={NAVIGATION_ITEM_HELP.slug}
        >
          {NAVIGATION_MAIN_MENU_ALT.map((item) => {
            return (
              <Button
                key={item.slug}
                endIcon={`arrow-blue`}
                to={item.slug}
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

      <Footer locale={locale} />
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
  locale: localePropType.isRequired,
};

Layout.defaultProps = {
  noStickyHeader: false,
  includeContactForm: true,
};

export default Layout;
