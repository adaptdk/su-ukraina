import * as React from "react";
import PropTypes from "prop-types";

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

const Layout = ({ children, noStickyHeader, pagePath }) => {
  return (
    <div className="Layout">
      <Header noSticky={noStickyHeader} />
      {!isUkrainianPage() && (
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
  currentPath: PropTypes.string,
};

export default Layout;
