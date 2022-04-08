import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@reach/router";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import RefugeeForm from "../RefugeeForm";
import Constraint from "../Constraint";
import Section from "../Section";
import PromoLine from "../PromoLine";
import Button from "../Button";

// Constants.
import {
  NAVIGATION_ITEM_HELP,
  NAVIGATION_ITEM_REFUGEE_GUIDE,
} from "../../constants/Navigation";

import "./Layout.css";

const Layout = ({ children, noStickyHeader, pagePath }) => {
  const location = useLocation();
  const splitPathname = location.pathname.split(`/`);

  const altHeader = [
    `pagalbos-paieska`,
    `refugee-guide`,
    `help-search`,
    `privacy-policy`,
  ].includes(splitPathname[1]);

  function RenderForm() {
    const refugeeGuidePath = `refugee-guide`;
    const helpSearchPath = `help-search`;
    const path = location.pathname;

    if (path.includes(refugeeGuidePath) || path.includes(helpSearchPath)) {
      return <RefugeeForm returnDestination={pagePath} />;
    }
    return <ContactForm returnDestination={pagePath} />;
  }

  return (
    <div className="Layout">
      <Header noSticky={noStickyHeader} altHeader={altHeader} />
      {!altHeader && (
        <PromoLine
          title="Вся важлива інформація для громадян України"
          titleLink={NAVIGATION_ITEM_HELP.pathname}
        >
          <Button
            endIcon={`arrow-blue`}
            to={NAVIGATION_ITEM_REFUGEE_GUIDE.pathname}
            color={`secondary`}
            target="_blank"
            rel="noopener"
          >
            Інформація
          </Button>
          <Button
            endIcon={`arrow-blue`}
            to={NAVIGATION_ITEM_HELP.pathname}
            color={`secondary`}
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
          <RenderForm />,
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
  currentPath: PropTypes.string,
};

export default Layout;
