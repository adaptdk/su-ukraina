import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="breadcrumb">
      <ol className="breadcrumb__container">
        <li className="breadcrumb__item">
          <Link to="/">Titulinis</Link>
        </li>
        {crumbs.map((crumb, index) => {
          return (
            <li key={index} className="breadcrumb__item">
              <span>{crumb}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(PropTypes.string),
};

export default Breadcrumb;
