import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { handlePath } from "../../helpers/handlers";

import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs, className = `` }) => {
  return (
    <nav className={`breadcrumb${className}`}>
      <ol className="breadcrumb__container">
        <li className="breadcrumb__item">
          <Link to="/">Titulinis</Link>
        </li>
        {crumbs.map((crumb, index) => {
          return crumbs.length !== index + 1 ? (
            <li key={index} className="breadcrumb__item">
              <Link to={handlePath(crumb)}>{crumb}</Link>
            </li>
          ) : (
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
  className: PropTypes.string,
};

export default Breadcrumb;
