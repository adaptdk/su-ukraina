import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { handlePath } from "../../helpers/handlers";

import "./AdditionalNavigation.css";

const AdditionalNavigation = ({ additionalNav }) => {
  return (
    <nav className="additional-navigation">
      <ol className="additional-navigation__container">
        {additionalNav.map((additionalEl, index) => {
          let path = handlePath(additionalEl);
          return (
            <li key={index}>
              <Link className="additional-navigation__item" to={path}>
                {additionalEl}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

AdditionalNavigation.propTypes = {
  additionalNav: PropTypes.arrayOf(PropTypes.string),
};

export default AdditionalNavigation;
