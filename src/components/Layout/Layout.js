import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import Constraint from "../Constraint";
import Section from "../Section";

import "./Layout.css";

const Layout = ({ children, noStickyHeader, pagePath }) => {
  return (
    <div className="Layout">
      <Header noSticky={noStickyHeader} withCTA={true} />
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
