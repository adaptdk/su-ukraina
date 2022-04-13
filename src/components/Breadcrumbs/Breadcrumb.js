import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { handlePath } from "../../helpers/handlers";

import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs }) => {
  return (
    <nav className="Breadcrumb">
      <ol className="Breadcrumb__container">
        <li className="Breadcrumb__item">
          <Link to="/">Titulinis</Link>
        </li>
        {crumbs.map((crumb, index) => {
          return crumbs.length !== index + 1 ? (
            <li key={index} className="Breadcrumb__item">
              <Link to={handlePath(crumb)}>{crumb}</Link>
            </li>
          ) : (
            <li key={index} className="Breadcrumb__item">
              <span>{crumb}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  isSolo: PropTypes.bool,
  crumbs: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

export default Breadcrumb;
