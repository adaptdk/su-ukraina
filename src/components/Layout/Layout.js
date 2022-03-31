import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import Constraint from "../Constraint";
import Section from "../Section";
import PromoLine from "../PromoLine";
import Button from "../Button";

import "./Layout.css";

const Layout = ({ children, noStickyHeader, pagePath }) => {
  const location = useLocation();
  const splitPathname = location.pathname.split(`/`);

  const altHeader = [
    `pagalbos-paieska`,
    `refugee-guide`,
    `help-search`,
  ].includes(splitPathname[1]);

  return (
    <div className="Layout">
      <Header noSticky={noStickyHeader} altHeader={altHeader} />
      {!altHeader && (
        <PromoLine
          title="Вся важлива інформація для громадян України"
          titleLink="https://www.withukraine.lt"
        >
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt"
            color={`secondary`}
            position={`right`}
            target="_blank"
            rel="noopener"
          >
            Інформація
          </Button>
          <Button
            icon={`arrow-blue`}
            href="https://www.withukraine.lt/help-search"
            color={`secondary`}
            position={`right`}
            target="_blank"
            rel="noopener"
          >
            Послуги
          </Button>
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
