import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import Constraint from "../Constraint";
import Section from "../Section";
import PromoLine from "../PromoLine";
import Button from "../Button";

import "./Layout.css";

const Layout = ({ children, noStickyHeader, pagePath }) => {
  const alternativeHeader = () => {
    if (typeof window === `undefined`) {
      return;
    }
    const pathName = window.location.pathname;
    if (
      pathName.startsWith(`/pagalba`) ||
      pathName.startsWith(`/help-search`) ||
      pathName.startsWith(`/refugee-guide`) ||
      pathName.startsWith(`/pagalbos-paieska`)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="Layout">
      <Header noSticky={noStickyHeader} altHeader={alternativeHeader()} />
      {!alternativeHeader() && (
        <PromoLine
          title="ВСЯ ВАЖЛИВА ІНФОРМАЦІЯ ДЛЯ ГРОМАДЯН УКРАЇНИ"
          titleLink="https://www.withukraine.lt"
        >
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt"
            color={`secondary`}
            text={`ІНФОРМАЦІЯ`}
            position={`right`}
            target="_blank"
            rel="noopener"
          />
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt/help-search"
            color={`secondary`}
            text={`послуги`}
            position={`right`}
            target="_blank"
            rel="noopener"
          />
        </PromoLine>
      )}
      <main>{children}</main>

      <Section className="ContactFormSection" bgColor="blue">
        <Constraint>
          <ContactForm returnDestination={pagePath} />
        </Constraint>
      </Section>

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  noStickyHeader: PropTypes.bool,
  pagePath: PropTypes.string,
};

export default Layout;
