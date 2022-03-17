import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";
import ContactForm from "../ContactForm";
import ProductForm from "../ProductForm";
import Constraint from "../Constraint";
import Section from "../Section";

import "./Layout.css";
const Layout = ({ children, pagePath }) => {

  function RenderForm(props) {
    const zinokiteKaPerkatePath = `zinokite-ka-perkate`;
    const path = props.currentPath;

    if (path.includes(zinokiteKaPerkatePath)) {
      return <ProductForm returnDestination={pagePath} />;
    }
    return <ContactForm returnDestination={pagePath} />;
  }

  return (
    <div className="Layout">
      <Header />

      <main>{children}</main>

      <Section className="ContactFormSection" bgColor="blue">
        <Constraint>
          <RenderForm currentPath={pagePath} />,
        </Constraint>
      </Section>

      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pagePath: PropTypes.string,
  currentPath: PropTypes.string,
};

export default Layout;
