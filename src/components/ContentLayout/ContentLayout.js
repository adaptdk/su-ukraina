import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

import "../Layout/Layout.css";

const ContentLayout = ({ children }) => {
  return (
    <div className="Layout">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node,
  pagePath: PropTypes.string,
};

export default ContentLayout;
