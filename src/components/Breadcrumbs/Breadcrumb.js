import React from "react";
import { navigate } from "gatsby";
import PropTypes from "prop-types";

import "./Breadcrumb.css";

const Breadcrumb = ({ crumbs }) => {
  const handleSelected = (selectedCrumb) => {
    if (selectedCrumb === `Titulinis`) {
      navigate(`/`);
    }
  };

  return (
    <nav className="Breadcrumb">
      <ul className="Breadcrumb__container">
        {crumbs.map((crumb, index) => {
          return (
            <li key={index} className="Breadcrumb__container--crumb">
              <button
                onClick={() => {
                  handleSelected(crumb);
                }}
              >
                {crumb}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Breadcrumb.propTypes = {
  crumbs: PropTypes.array,
};

export default Breadcrumb;
