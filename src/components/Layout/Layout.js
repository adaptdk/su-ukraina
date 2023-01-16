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

import "./Layout.css";
import PageTitle from "../PageTitle";
import {
  localePropType,
  navigationPropTypes,
  nodeSlugsDefaultProps,
  nodeSlugsPropTypes,
  promoLinePropTypes,
} from "../../helpers/genericPropTypes";

const Layout = ({
  children,
  stickyHeader,
  pagePath,
  metaTitle,
  metaDescription,
  includeContactForm,
  navigation,
  locale,
  currentNodeSlugs,
  promoLine,
  isHomepage,
}) => {
  const isUa = locale === `uk-UA`;

  return (
    <div className="Layout">
      <PageTitle title={metaTitle || ``} />
      <Meta name="description" content={metaDescription || ``} />
      <Header
        navigation={navigation}
        noSticky={!stickyHeader}
        locale={locale}
        currentNodeSlugs={currentNodeSlugs}
      />
      {promoLine && !isUa && !isHomepage && (
        <PromoLine
          title={promoLine?.heading}
          subtitle={promoLine?.subheading}
          titleLink={promoLine?.titleLink}
        >
          {promoLine?.linkButtons?.at(0) &&
            promoLine?.linkButtons.map((item) => {
              return (
                <Button
                  key={item.id}
                  endIcon={`arrow-blue`}
                  to={item.url}
                  color={`secondary`}
                  target="_blank"
                  rel="noopener"
                >
                  {item.label}
                  {item?.sublabel && <span>{item.sublabel}</span>}
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
  stickyHeader: PropTypes.bool,
  includeContactForm: PropTypes.bool,
  navigation: navigationPropTypes.isRequired,
  promoLine: promoLinePropTypes,
  locale: localePropType.isRequired,
  currentNodeSlugs: nodeSlugsPropTypes,
  isHomepage: PropTypes.bool,
};

Layout.defaultProps = {
  noStickyHeader: true,
  includeContactForm: true,
  currentNodeSlugs: nodeSlugsDefaultProps,
  isHomepage: false,
};

export default Layout;
