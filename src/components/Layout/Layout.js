import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import Constraint from "../Constraint";
import Section from "../Section";

import "./Layout.css";

const Layout = ({ children, pagePath }) => {
  return (
    <div className="Layout">
      <html lang="lt" />
      <Header />

      <main>{children}</main>

      <Section bgColor="blue">
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
  pagePath: PropTypes.string,
};

export default Layout;
