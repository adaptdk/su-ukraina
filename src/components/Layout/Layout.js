import * as React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

import "./Layout.css";
import "../../styles/main.css";

const Layout = ({ children }) => {
  return (
    <div className="Layout">
      <html lang="lt" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
